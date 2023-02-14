import { Category, useCategories } from "@modules/api";
import { SearchField } from "@modules/client";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemProps,
  ListItemText,
} from "@mui/material";
import {
  CrmSidebar,
  PageProvider,
  CRMContainer,
  paths,
  DictionaryPanel,
  DeleteCategoryDialog,
} from "crmui";
import Link from "next/link";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface CategoryListItemProps extends ListItemProps {
  category: Category;
  onDelete: () => void;
  href: string;
}

const CategoryListItem: React.FC<CategoryListItemProps> = ({
  category,
  onDelete,
  href,
  ...props
}) => (
  <ListItem {...props}>
    <ListItemButton LinkComponent={Link} href={href}>
      <ListItemText primary={category.name} secondary={category.type} />
    </ListItemButton>
    <ListItemButton
      onClick={onDelete}
      sx={{
        color: "error.main",
        justifyContent: "flex-end",
        flex: "inherit",
      }}
    >
      <DeleteIcon /> Удалить
    </ListItemButton>
  </ListItem>
);

interface CategoriesListProps {
  categories: Category[];
  onDelete: (category: Category) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  categories,
  onDelete,
}) => {
  const [search, setSearch] = React.useState("");
  const filteredCategories = React.useMemo(
    () =>
      categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      ),
    [categories, search]
  );
  if (!categories.length) {
    return <Box>Нет категорий</Box>;
  }
  return (
    <Box>
      <SearchField onChange={(e) => setSearch(e.target.value)} />
      <List>
        {filteredCategories.map((category) => (
          <CategoryListItem
            key={category.id}
            category={category}
            href={paths.category({ categoryId: category.id })}
            onDelete={() => onDelete(category)}
          />
        ))}
      </List>
    </Box>
  );
};

const CategoriesPage: React.FC = () => {
  const { categories, isCategoriesLoading, mutateCategories } = useCategories(
    {}
  );
  const [deleteCategory, setDeleteCategory] = React.useState<Category | null>(
    null
  );
  return (
    <PageProvider title="Категории фильмов">
      <CRMContainer sidebarContent={<CrmSidebar />}>
        <DictionaryPanel
          createLink={paths.category({ categoryId: "create" })}
        />
        {isCategoriesLoading ? (
          <CircularProgress />
        ) : (
          <CategoriesList
            categories={categories || []}
            onDelete={setDeleteCategory}
          />
        )}
        <DeleteCategoryDialog
          data={deleteCategory}
          open={!!deleteCategory}
          onCancel={() => setDeleteCategory(null)}
          onDelete={() => {
            mutateCategories(
              categories?.filter((c) => c.id !== deleteCategory?.id)
            );
            setDeleteCategory(null);
          }}
        />
      </CRMContainer>
    </PageProvider>
  );
};

export default CategoriesPage;
