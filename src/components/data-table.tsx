"use client"
import { clsx } from "clsx"
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Checkbox } from "@/components/ui/checkbox"

const DataTable = ({ columns, data } :{columns:TColumns, data : TProblem[] | TClass[]}) => {
  
  console.log(JSON.stringify(data,null,2));
  
  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={col.key} className={clsx( (col.key =='problem' || col.key == 'topic') ? 'w-[60%]' : 'text-center')} ><div>{col.label}</div></TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className=" ">
          {data.map((row: any) => (
            <TableRow key={row.id} className="odd:bg-gray-100">
              {columns.map(col => {
                const value = row[col.key];
                if (value === null) {
                  return (
                    <TableCell key={value}>-</TableCell>
                  )
                } else if( col.key == 'level' ) {
                  return (
                  <TableCell key={value+col.key} className="text-center">
                    <span className={clsx(`border-2 p-1 rounded-2xl `,value == 'easy' && 'bg-green-200',value == 'medium' && 'bg-orange-200',value == 'hard' && 'bg-red-200' )} >
                      {value?.toString()}
                    </span>
                  </TableCell>)
                } else if ( col.key == 'link' || col.key == 'ytlink') {
                  let icon = col.key == 'link' ? 'leetcode.svg' : 'youtube.svg';
                  return (
                    <TableCell key={value} >
                      <a rel="stylesheet" href={value?.toString()} target="_blank" className="flex justify-center">
                        <Image src={icon} alt="icon" height={30} width={30}/>
                      </a>
                    </TableCell>
                  )
                } else if ( col.key == 'status' ) {
                  return (
                    <TableCell key={col.key+value} className="text-center"><Checkbox checked={value} /></TableCell>
                  )
                } else if ( col.key == 'date' ) {
                  return (
                    <TableCell key={value}>{value ? new Date(value).toLocaleString('en-IN') : "To be updated!"}</TableCell>
                    )
                } else {
                  return (
                  <TableCell key={value}>{value?.toString()}</TableCell>
                  )
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable;