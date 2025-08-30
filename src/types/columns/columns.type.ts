import { ReactNode } from 'react'

export type Column<TId, FSubId, TRow> = {
  id: TId
  label: string
  style?: React.CSSProperties
  children?: Array<Column<FSubId, FSubId, TRow>>
} & ( // When there are children, render of the parent is not needed
  | { children: Array<Column<FSubId, FSubId, TRow>>; render?: never }
  | { children?: never; render: (row: TRow, index: number) => ReactNode }
)

export type ColumnsDefinition<TId, FSubId, TRow> = Array<
  Column<TId, FSubId, TRow>
>

export type ColumnGenerics<TId = string, FSubId = never, TRow = unknown> = {
  TId: TId
  FSubId: FSubId
  TRow: TRow
  TColumns: ColumnsDefinition<TId, FSubId, TRow>
}
