import Layout from "@theme/Layout";
import React from "react";
import ResumePage from "../../components/Resume/ResumePage";

export default function ResumeEducation(): JSX.Element {
	return (
		<Layout description="Didier Lopes: experience, articles and education.">
			<ResumePage section="education" />
		</Layout>
	);
}
