import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "pages/blog-posts";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from "pages/category";
import { ItemCreate, ItemEdit, ItemList, ItemShow } from "pages/item";
import { CustomerCreate, CustomerEdit, CustomerList, CustomerShow } from "pages/customer";
import { SaleList, SaleShow } from "pages/sale";
import { BillList } from "pages/bill/list";

function App() {
  return (
    <BrowserRouter>
      
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("http://localhost:3004")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              resources={[
                {
                  name: "category",
                  list: "/category",
                  create: "/category/create",
                  edit: "/category/edit/:id",
                  show: "/category/show/:id",
                },
                {
                  name: "item",
                  list: "/item",
                  create: "/item/create",
                  edit: "/item/edit/:id",
                  show: "/item/show/:id",
                },
                {
                  name: "customer",
                  list: "/customer",
                  create: "/customer/create",
                  edit: "/customer/edit/:id",
                  show: "/customer/show/:id",
                },
                {
                  name: "sale",
                  list: "/sale",
                  create: "/sale/create",
                  edit: "/sale/edit/:id",
                  show: "/sale/show/:id",
                },
                {
                  name: "bill",
                  list: "/bill",
                  create: "/bill/create",
                  edit: "/bill/edit/:id",
                  show: "/bill/show/:id",
                },
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                }
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2 Header={() => <Header isSticky={true} />}>
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="category" />}
                  />
                  <Route path="/category">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  <Route path="/item">
                    <Route index element={<ItemList />} />
                    <Route path="create" element={<ItemCreate />} />
                    <Route path="edit/:id" element={<ItemEdit />} />
                    <Route path="show/:id" element={<ItemShow />} />
                  </Route>
                  <Route path="/customer">
                    <Route index element={<CustomerList />} />
                    <Route path="create" element={<CustomerCreate />} />
                    <Route path="edit/:id" element={<CustomerEdit />} />
                    <Route path="show/:id" element={<CustomerShow />} />
                  </Route>
                  <Route path="/sale">
                    <Route index element={<SaleList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<SaleShow />} />
                  </Route>
                  <Route path="/bill">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>
                  <Route path="/blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
