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

export default function Home() {

  const nextClass = "Introduction Class"
  const nextClassDateTime = new Date('2024-06-17T16:30:00.000Z').toLocaleString('en-IN');

  const data1: TRowData<typeof columnsTable1>[] = [
    {
      "problem": "Two Sum",
      "link": "https://www.https://www.leetcode.com",
      "level": "easy",
      "status": true
    },
    {
      "problem": "Reverse Linked List",
      "link": "https://www.leetcode.com",
      "level": "easy",
      "status": false
    },
    {
      "problem": "Merge Sorted Array",
      "link": "https://www.leetcode.com",
      "level": "easy",
      "status": false
    },
    {
      "problem": "Valid Parentheses",
      "link": "https://www.leetcode.com",
      "level": "easy",
      "status": false
    },
    {
      "problem": "Maximum Subarray",
      "link": "https://www.leetcode.com",
      "level": "medium",
      "status": false
    },
    {
      "problem": "Climbing Stairs",
      "link": "https://www.leetcode.com",
      "level": "medium",
      "status": true
    },
    {
      "problem": "Remove Duplicates from Sorted Array",
      "link": "https://www.leetcode.com",
      "level": "medium",
      "status": true
    },
    {
      "problem": "Best Time to Buy and Sell Stock",
      "link": "https://www.leetcode.com",
      "level": "hard",
      "status": false
    },
    {
      "problem": "Intersection of Two Linked Lists",
      "link": "https://www.leetcode.com",
      "level": "hard",
      "status": false
    },
    {
      "problem": "Binary Tree Inorder Traversal",
      "link": "https://www.leetcode.com",
      "level": "hard",
      "status": false
    }
  ]

  const topics = [
    {
      "topicName": "Array",
      "data": data1
    },
    {
      "topicName": "Array2",
      "data": data1
    }
  ]


  const data2: TRowData<typeof columnsTable1>[] = [
    {
      "topic": "Sliding Window",
      "ytlink": "https://www.https://www.leetcode.com",
      "date": new Date().toDateString(),
      "status": true
    },
    {
      "topic": "Sliding Window",
      "ytlink": "https://www.https://www.leetcode.com",
      "date": new Date().toDateString(),
      "status": false
    },
  ]

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
              {topics.map(topic => {
                return (
                <Accordion className="mb-1 last:mb-0" key={topic.topicName} type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">{topic.topicName}</AccordionTrigger>
                    <AccordionContent>
                      <DataTable columns={columnsTable1} data={data1} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                )
              })}
            </div>
          </TabsContent>
          <TabsContent value="account">
            <div className="border-2 border-black p-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl">Array</AccordionTrigger>
                  <AccordionContent>
                    <DataTable columns={columnsTable2} data={data2} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
