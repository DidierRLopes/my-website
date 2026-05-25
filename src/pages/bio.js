import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

export default function Bio() {
  return (
    <Layout title="Short Bio" description="Short bio of Bianca Buzea">
      <Head>
        <title>Short Bio | Bianca Buzea</title>
      </Head>
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem', lineHeight: '1.8' }}>
        <h1>Short Bio</h1>
        <br />

        <h3>Head of DevRel. Founder of <a href="https://www.devreluni.com/" target="_blank" rel="noopener noreferrer">DevRel Uni</a>. Making complex systems legible.</h3>
        <br />
        <p>Growing up in a village of fewer than 3,000 people taught me early that effort without understanding systems doesn't compound. My first opportunities to see the world came not from money but from learning. Winning national French Olympiads earned me international trips my family couldn't otherwise afford. Those experiences became my first passport to the world. Literally.</p>
        <p>They led me to study Computer Science abroad in Scotland, start my career as a Solutions Architect at AWS, and eventually move full-time into Web3 and Developer Relations.</p>
        <p>Along the way, I realized my real strength wasn't just technical execution. It was making complex, undervalued systems legible. Careers, incentives, education paths, financial decisions. The things that quietly shape outcomes but are rarely explained.</p>
        <p>That's why I founded <strong>DevRel Uni</strong>, the first program dedicated to helping people break into Developer Relations. Since 2022, we've shipped 6 cohorts, taught participants from 50+ countries, and supported protocols across Web3 with DevRel talent.</p>
        <p>Today, my work sits at the intersection of technology, education, and understanding how the world really works. I optimize for building leverage: communities, frameworks, and narratives that help people from non-traditional backgrounds navigate emerging tech careers to gain freedom.</p>

        <h2 style={{ marginTop: '2rem' }}>Get in Touch</h2>
        <br />
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '1.5rem' }}>
            🤙 <strong>X</strong> Short questions or messages: <a href="https://twitter.com/buzea200" target="_blank" rel="noopener noreferrer">@buzea200</a>
          </li>
          <li style={{ marginBottom: '1.5rem' }}>
            📨 <strong>Email</strong> For longer conversations: <a href="mailto:biancabuzea200@gmail.com">biancabuzea200@gmail.com</a>
          </li>
          <li style={{ marginBottom: '1.5rem' }}>
            ☕ <strong>In person</strong> I'm based in Berlin. If you're visiting and want to grab a coffee, drop me an email with [Coffee] in the subject line.
          </li>
        </ul>
      </main>
    </Layout>
  );
}
