import { ReactNode } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => ReactNode;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  keyField: string;
  actions?: (item: any) => ReactNode;
}

export function ResponsiveTable({ columns, data, keyField, actions }: ResponsiveTableProps) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border border-border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap"
                >
                  {column.label}
                </th>
              ))}
              {actions && (
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground whitespace-nowrap">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item[keyField]}
                className="border-b border-border transition-colors hover:bg-muted/50"
              >
                {columns.map((column) => (
                  <td key={column.key} className="p-4 align-middle">
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="p-4 align-middle text-right">{actions(item)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {data.map((item) => (
          <Card key={item[keyField]} className="p-4">
            {columns.map((column) => (
              <div key={column.key} className="flex justify-between items-start py-2 border-b border-border last:border-0">
                <span className="text-muted-foreground">{column.label}:</span>
                <span className="text-foreground text-right ml-2">
                  {column.render ? column.render(item[column.key], item) : item[column.key]}
                </span>
              </div>
            ))}
            {actions && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                {actions(item)}
              </div>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
