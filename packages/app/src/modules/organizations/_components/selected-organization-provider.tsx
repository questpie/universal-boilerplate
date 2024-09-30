'use client'
import type { OrganizationWithRole } from '@questpie/api/modules/organizations/services/organizations.service'
import { AtomsHydrator } from '@questpie/app/atoms/atoms-provider'
import { getRootStore } from '@questpie/app/atoms/root-store'
import { setOrganization } from '@questpie/app/modules/organizations/organization.actions'
import { atom, useAtomValue } from 'jotai'
import { useEffect, type PropsWithChildren } from 'react'

export const organizationAtom = atom<OrganizationWithRole | null>(null)

export function getSelectedOrganizationId() {
  return getRootStore().get(organizationAtom)?.id
}

export function OrganizationProvider(
  props: PropsWithChildren<{ organization: OrganizationWithRole }>
) {
  useEffect(() => {
    if (props.organization?.id) {
      setOrganization(props.organization.id)
    }
  }, [props.organization?.id])

  return (
    <AtomsHydrator atomValues={[[organizationAtom, props.organization]]}>
      {props.children}
    </AtomsHydrator>
  )
}

export function useSelectedOrganization() {
  return useAtomValue(organizationAtom)
}
