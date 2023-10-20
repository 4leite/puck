import dynamic from "next/dynamic";
import { Metadata } from "next";
import { getAllPaths, getPageData } from "./actions";
import { Render } from "./render";
import { notFound } from "next/navigation";

const Client = dynamic(() => import("./client"), {
  ssr: false,
});

const Preview = dynamic(() => import("./preview"), {
  ssr: false,
});

export async function generateStaticParams() {
  return getAllPaths();
}

const resolvePuckPath = (puckPath: string[] = []) => {
  const suffix = puckPath.length > 0 && puckPath[puckPath.length - 1];

  return {
    isEdit: suffix === "edit",
    isPreview: suffix === "preview",
    path:
      suffix === "edit" || suffix === "preview"
        ? `/${[...puckPath].slice(0, puckPath.length - 1).join("/")}`
        : `/${puckPath.join("/")}`,
  };
};

export async function generateMetadata({
  params,
}: {
  params: { framework: string; uuid: string; puckPath: string[] };
}): Promise<Metadata> {
  const { isEdit, isPreview, path } = resolvePuckPath(params.puckPath);

  if (isEdit) {
    return {
      title: "Editing: " + path,
    };
  }

  if (isPreview) {
    return {
      title: "Preview: " + path,
    };
  }

  const data = await getPageData(path);

  return {
    title: data?.root.title || "",
  };
}

export default async function Page({
  params,
}: {
  params: { framework: string; uuid: string; puckPath: string[] };
}) {
  const { isEdit, isPreview, path } = resolvePuckPath(params.puckPath);

  const data = await getPageData(path);

  if (isPreview) {
    return <Preview path={path} data={data} />;
  }

  if (isEdit) {
    return <Client path={path} data={data} />;
  }

  if (!data) {
    return notFound();
  }

  return <Render data={data} />;
}
