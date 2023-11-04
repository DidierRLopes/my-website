import * as React from "react";
import Head from "@docusaurus/Head";

export default function HeadTitle({ title }: { title: string }) {
    return (
        <Head>
            <title className="text-2xl bg-slate-500">
                {title}
            </title>
        </Head>
    );
}