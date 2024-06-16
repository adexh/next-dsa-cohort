import Image from "next/image";

import DataTable from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import Link from "next/link";

import { columnsTable1, columnsTable2 } from "./data-table-columns";
import { ProfileDropDown } from "./profile-dropdown";

export default function Home() {

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
      <div className="flex justify-between mt-4 mr-24"><div className="text-4xl font-mono font-medium ml-24">DSA Cohort<span className="text-lg">By Adesh</span></div><ProfileDropDown><Image src={"/undraw_profile.svg"} alt="profile-icon" width={60} height={60} className="transition-transform hover:scale-105" /></ProfileDropDown></div>
      <div className="p-24 font-mono font">
        <div className="text-2xl mb-4">Next Class : <span className="text-gray-400">You will find your next class topic here...</span></div>
        <div className="text-2xl">Join : <span className="text-gray-400">Class link will appear here...</span></div>
        <div className="border-2 border-gray-400 my-10" />
        <Tabs defaultValue="account">
          <TabsList >
            <TabsTrigger value="account" className="text-2xl">Practice</TabsTrigger>
            <TabsTrigger value="password" className="text-2xl">Classes</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="border-2 border-black p-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl">Array</AccordionTrigger>
                  <AccordionContent>
                    <DataTable columns={columnsTable1} data={data1} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
          <TabsContent value="password">
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
