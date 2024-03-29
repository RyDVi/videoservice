import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import { useRouter } from "next/router";
import React from "react";
import { CircularProgress } from "@mui/material";
import { usePersonRole } from "@modules/axios-hooks";
import { CrmSidebar } from "src/CrmSidebar";
import { CreateEditPersonRoleForm } from "src/forms";

function PersonRolePage() {
  const router = useRouter();
  const personRoleId = router.query.roleId as string;
  const isCreating = personRoleId === "create";
  const { personRole, isPersonRoleLoading } = usePersonRole(
    isCreating ? null : personRoleId
  );
  useCrmPageTitle(
    isCreating ? "Создание роли персоны" : `Роль персоны ${personRole?.name}`
  );
  return (
    <>
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
    </>
  );
}

PersonRolePage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default PersonRolePage;
