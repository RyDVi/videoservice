import {
  CrmSidebar,
  PageProvider,
  CRMContainer,
  CreateEditPersonRoleForm,
} from "crmui";
import { useRouter } from "next/router";
import React from "react";
import { CircularProgress } from "@mui/material";
import { usePersonRole } from "@modules/api";

const PersonRolePage: React.FC = () => {
  const router = useRouter();
  const personRoleId = router.query.roleId as string;
  const isCreating = personRoleId === "create";
  const { personRole, isPersonRoleLoading } = usePersonRole(isCreating ? null : personRoleId);
  return (
    <PageProvider title={isCreating ? "Создание роли персоны" : `Роль персоны ${personRole?.name}`}>
      <CRMContainer sidebarContent={<CrmSidebar />}>
        {isPersonRoleLoading && !isCreating ? (
          <CircularProgress />
        ) : (
          <CreateEditPersonRoleForm
            data={personRole}
            onSave={() => {
              router.back();
            }}
            onCancel={() => {
              router.back();
            }}
          />
        )}
      </CRMContainer>
    </PageProvider>
  );
};

export default PersonRolePage;
