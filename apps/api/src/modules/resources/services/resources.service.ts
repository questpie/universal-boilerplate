import cuid2 from '@paralleldrive/cuid2'
import type { PaginationSchema } from '@questpie/api/common/common.schemas'
import type { TransactionLike } from '@questpie/api/db/db.client'
import { resourcesTable } from '@questpie/api/db/db.schema'
import { drive } from '@questpie/api/drive/drive'
import { iocRegister } from '@questpie/api/ioc'
import { getResourcePublicUrl } from '@questpie/api/modules/resources/resource.utils'
import type { ResourceSchema } from '@questpie/shared/modules/resources/resources.schemas'
import { extractPathExt } from '@questpie/shared/utils/string'
import { and, desc, eq, inArray } from 'drizzle-orm'
import type { Static } from 'elysia'
import { Readable } from 'node:stream'

export type Resource = Static<typeof ResourceSchema>

class ResourcesService {
  async getAll(
    db: TransactionLike,
    opts: { organizationId: string; pagination: Static<typeof PaginationSchema> }
  ): Promise<{ data: Resource[]; nextCursor: number | null }> {
    const resources = await db
      .select({
        id: resourcesTable.id,
        type: resourcesTable.type,
        location: resourcesTable.location,
        isExternal: resourcesTable.isExternal,
        createdAt: resourcesTable.createdAt,
      })
      .from(resourcesTable)
      .where(eq(resourcesTable.organizationId, opts.organizationId))
      .orderBy(desc(resourcesTable.createdAt))
      .limit(opts.pagination.limit + 1)
      .offset(opts.pagination.cursor)

    const hasNextPage = resources.length > opts.pagination.limit
    const results = resources.slice(0, opts.pagination.limit)
    const nextCursor = hasNextPage ? opts.pagination.cursor + opts.pagination.limit : null

    return {
      data: await Promise.all(
        results.map(async (resource, i) => ({
          ...resource,
          url: await getResourcePublicUrl(resource),
        }))
      ),
      nextCursor,
    }
  }

  async getById(
    db: TransactionLike,
    opts: {
      id: string
      organizationId: string
    }
  ): Promise<Resource | null> {
    const resource = await db
      .select({
        id: resourcesTable.id,
        type: resourcesTable.type,
        location: resourcesTable.location,
        isExternal: resourcesTable.isExternal,
        createdAt: resourcesTable.createdAt,
      })
      .from(resourcesTable)
      .where(
        and(eq(resourcesTable.id, opts.id), eq(resourcesTable.organizationId, opts.organizationId))
      )
      .then((r) => r[0])

    if (!resource) return null

    return {
      ...resource,
      url: await getResourcePublicUrl(resource),
    }
  }

  async deleteById(
    db: TransactionLike,
    opts: { id: string; organizationId: string }
  ): Promise<string | null> {
    return db.transaction(async (trx) => {
      const resource = await trx
        .delete(resourcesTable)
        .where(
          and(
            eq(resourcesTable.id, opts.id),
            eq(resourcesTable.organizationId, opts.organizationId)
          )
        )
        .returning({
          id: resourcesTable.id,
          location: resourcesTable.location,
          isExternal: resourcesTable.isExternal,
        })
        .then((r) => r[0])

      if (!resource) return null
      if (!resource.isExternal && resource.location) {
        await drive.use().delete(resource.location)
      }
      return resource.id
    })
  }

  async create(
    db: TransactionLike,
    opts: { organizationId: string; files: File[] }
  ): Promise<Resource[]> {
    return db.transaction(async (trx) => {
      const payload = opts.files.map((file) => ({
        fileName: `${opts.organizationId}/${Date.now()}-${cuid2.createId()}${extractPathExt(file.name)}`,
        content: file,
      }))

      const resources = await trx
        .insert(resourcesTable)
        .values(
          payload.map((item, i) => ({
            organizationId: opts.organizationId,
            type: item.content.type,
            location: item.fileName,
            isExternal: false,
            cleanupAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days
          }))
        )
        .returning({
          id: resourcesTable.id,
          type: resourcesTable.type,
          location: resourcesTable.location,
          isExternal: resourcesTable.isExternal,
          createdAt: resourcesTable.createdAt,
        })

      await Promise.all(
        payload.map(async (item) => {
          return drive
            .use()
            .putStream(item.fileName, Readable.fromWeb(item.content.stream() as any), {
              contentType: item.content.type,
            })
        })
      )

      return Promise.all(
        resources.map(async (resource) => ({
          ...resource,
          url: await getResourcePublicUrl(resource),
        }))
      )
    })
  }

  async approveResources(
    db: TransactionLike,
    opts: { organizationId: string; ids: string[] }
  ): Promise<string[]> {
    if (!opts.ids.length) return []

    return db
      .update(resourcesTable)
      .set({
        cleanupAt: null,
      })
      .where(
        and(
          eq(resourcesTable.organizationId, opts.organizationId),
          inArray(resourcesTable.id, opts.ids)
        )
      )
      .returning({
        id: resourcesTable.id,
      })
      .then((data) => data.map((r) => r.id))
  }

  async scheduleCleanup(
    db: TransactionLike,
    opts: { organizationId: string; ids: string[]; cleanupAt?: string }
  ): Promise<string[]> {
    if (!opts.ids.length) return []
    return db
      .update(resourcesTable)
      .set({
        cleanupAt: opts.cleanupAt || new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days
      })
      .where(
        and(
          eq(resourcesTable.organizationId, opts.organizationId),
          inArray(resourcesTable.id, opts.ids)
        )
      )
      .returning({
        id: resourcesTable.id,
      })
      .then((data) => data.map((r) => r.id))
  }
}

export const injectResourcesService = iocRegister('resourcesService', () => new ResourcesService())
