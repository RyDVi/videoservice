import {
  CrmSidebar,
  CRMContainer,
  CreateEditPersonForm,
  useCrmPageTitle,
} from "crmui";
import { useRouter } from "next/router";
import React from "react";
import { CircularProgress } from "@mui/material";
import { usePerson } from "@modules/api";
import { formatFullName } from "@modules/utils";

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
