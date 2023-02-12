import { Category, useCategories } from "@modules/api";
import {
  Box,
  CircularProgress,
  List,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
} from "@mui/material";
import {
  CrmSidebar,
  PageProvider,
  CRMContainer,
  paths,
  DictionaryPanel,
} from "crmui";
import Link from "next/link";

interface CategoryListItemProps extends ListItemButtonProps {
  category: Category;
}

const CategoryListItem: React.FC<CategoryListItemProps> = ({
  category,
  ...props
}) => (
  <ListItemButton {...props}>
    <ListItemText primary={category.name} secondary={category.type} />
  </ListItemButton>
);

interface CategoriesListProps {
  categories: Category[];
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories }) => {
  if (!categories.length) {
    return <Box>Нет категорий</Box>;
  }
  return (
    <List>
      {categories.map((category) => (
        <CategoryListItem
          key={category.id}
          category={category}
          component={Link}
          to={paths.category({ categoryId: category.id })}
        />
      ))}
    </List>
  );
};

const CategoriesPage: React.FC = () => {
  const { categories, isCategoriesLoading } = useCategories({});
  return (
    <PageProvider title="Категории фильмов">
      <CRMContainer sidebarContent={<CrmSidebar />}>
        <DictionaryPanel
          createLink={paths.category({ categoryId: "create" })}
        />
        {isCategoriesLoading ? (
          <CircularProgress />
        ) : (
          <CategoriesList categories={categories || []} />
        )}
      </CRMContainer>
    </PageProvider>
  );
};

export default CategoriesPage;
