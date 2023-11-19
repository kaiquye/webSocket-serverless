import { SetMetadata } from '@nestjs/common';

export const enum PERMISSIONS {
  VISITOR = 'VISITOR',
  ADMIN = 'ADMIN',
}

export const PermissionRequired = (CLAIMS: string[]) => SetMetadata('claims', CLAIMS);
