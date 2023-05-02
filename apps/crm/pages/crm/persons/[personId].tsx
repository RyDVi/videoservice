import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import { useRouter } from "next/router";
import React from "react";
import { CircularProgress } from "@mui/material";
import { usePerson } from "@modules/request-hooks";
import { formatFullName } from "@modules/utils";
import { CreateEditPersonForm } from "src/forms";
import { CrmSidebar } from "src/CrmSidebar";

function PersonPage() {
  const router = useRouter();
  const personId = router.query.personId as string;
  const isCreating = personId === "create";
  const { isPersonLoading, person } = usePerson(isCreating ? null : personId);
  useCrmPageTitle(
    isCreating
      ? "Добавлание персоны"
      : `Персона ${person ? formatFullName(person) : ""}`
  );
  return (
    <>
      {isPersonLoading && !isCreating ? (
        <CircularProgress />
      ) : (
        <CreateEditPersonForm
          data={person}
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

PersonPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default PersonPage;
