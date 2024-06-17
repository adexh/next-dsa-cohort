import DataTable from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { columnsTable1, columnsTable2 } from "./data-table-columns";
import { db } from "@/lib/db";
import { jsonData } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function Home() {

  const result = await db.select().from(jsonData).orderBy(jsonData.id);

  //@ts-ignore
  const problemsData:TTopic[] = result[0].data;
  //@ts-ignore
  const classData:{topic:string, time:string} = result[1].data;
  //@ts-ignore
  const classesData:TTopicClass[] = result[2].data;

  const nextClass = classData.topic;

  const nextClassDateTime = classData.time ? new Date(classData.time).toLocaleString('en-IN') : "To be updated!"

  return (
    <>
      <Header />
      <div className="p-2 pt-10 md:p-24 font-mono font">
        <div className="text-xl md:text-2xl mb-2 md:mb-4">Next Class : <span className="text-gray-800">{nextClass}</span></div>
        <div className="text-xl md:text-2xl mb-2 md:mb-4">Date : <span className="text-gray-800">{nextClassDateTime}</span></div>
        <div className="text-xl md:text-2xl">Join : <a href="https://meet.google.com/xxx-yyyy-zzz" className="text-blue-800 underline">xxx-yyyy-zzz</a></div>
        <div className="border-2 border-gray-400 my-5 md:my-10" />
        <Tabs defaultValue="practice">
          <TabsList >
            <TabsTrigger value="practice" className="text-2xl">Practice</TabsTrigger>
            <TabsTrigger value="account" className="text-2xl">Classes</TabsTrigger>
          </TabsList>
          <TabsContent value="practice">
            <div className="border-2 border-black p-2 md:p-4">
              {problemsData?.map(topic => {
                return (
                <Accordion className="mb-1 last:mb-0" key={topic.id} type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">{topic.name}</AccordionTrigger>
                    <AccordionContent>
                      <DataTable columns={columnsTable1} data={topic.problems} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                )
              })}
            </div>
          </TabsContent>
          <TabsContent value="account">
            <div className="border-2 border-black p-4">
            {classesData?.map(topic => {
                return (
                <Accordion className="mb-1 last:mb-0" key={topic.id} type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">{topic.name}</AccordionTrigger>
                    <AccordionContent>
                      <DataTable columns={columnsTable2} data={topic.classes} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
