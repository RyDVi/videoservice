import {
  CrmSidebar,
  PageProvider,
  CRMContainer,
  CreateEditPersonForm,
} from "crmui";
import { useRouter } from "next/router";
import React from "react";
import { CircularProgress } from "@mui/material";
import { usePerson } from "@modules/api";
import { formatFullName } from "@modules/utils";

const GenrePage: React.FC = () => {
  const router = useRouter();
  const personId = router.query.personId as string;
  const isCreating = personId === "create";
  const { isPersonLoading, person } = usePerson(isCreating ? null : personId);
  return (
    <PageProvider
      title={
        isCreating
          ? "Добавлание персоны"
          : `Персона ${person ? formatFullName(person) : ""}`
      }
    >
      <CRMContainer sidebarContent={<CrmSidebar />}>
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
      </CRMContainer>
    </PageProvider>
  );
};

export default GenrePage;
