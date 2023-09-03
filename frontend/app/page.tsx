import MainPage from "@/components/MainPage";
import { fetchMemberData, getMembers } from "@/utils/helpers";

import "@/styles/page.css";

export default async function App() {
  const data = await fetchMemberData();

  return (
    <main className="main-container">
      <header>
        <h1>United States Representatives</h1>
      </header>
      <MainPage members={getMembers(data)} />
    </main>
  );
}
