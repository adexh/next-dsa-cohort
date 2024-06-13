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

const DataTable = (porps : { columns : TColumns, data : TRowData<TColumns>[] }) => {
  // const [data, setData] = useState([]);


  // useEffect(() => {
  //   const fetchTableData = async () => {
  //     const data = await fetch("/api/clients/getClients");
  //     let result = await data.json();

  //     setData(result);
  //   }
  //   fetchTableData();
  // }, [])

  return <>
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            {porps.columns.map((col, index) => (
              <TableHead key={col.key} className={clsx( (col.key =='problem' || col.key == 'topic') ? 'w-[60%]' : 'text-center')} ><div>{col.label}</div></TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className=" ">
          {porps.data.map((row: any) => (
            <TableRow key={row.id} className="odd:bg-gray-100">
              {porps.columns.map(col => {
                const value = row[col.key];
                if (value === null) {
                  return <>
                    <TableCell key={value}>-</TableCell>
                  </>
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
                      <Link rel="stylesheet" href={value?.toString()} className="flex justify-center">
                        <Image src={icon} alt="leetocde_icon" height={30} width={30}/>
                      </Link>
                    </TableCell>
                  )
                } else if ( col.key == 'status' ) {
                  return (
                    <TableCell key={col.key+value} className="text-center"><Checkbox checked={value} /></TableCell>
                  )
                } else {
                  return <>
                  <TableCell key={value}>{value?.toString()}</TableCell>
                </>
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </>
}

export default DataTable;