import KnowledgeGraphChart from "@/components/knowledgegraph/knowledgegraph";

export default function Knowledgegraph() {
  return (
    <main className="flex flex-col gap-8 items-center sm:items-start px-6 pb-10">
      <div className="w-full">
        <KnowledgeGraphChart />
      </div>
    </main>
  );
}
