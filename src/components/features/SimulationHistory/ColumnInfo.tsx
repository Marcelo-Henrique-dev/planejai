interface ColumnInfoProps {
  title: string
  subtitle: string
  isHeader?: boolean
  prefix?: string
  sufix?: string
}

export default function ColumnInfo({ title, subtitle, isHeader, prefix, sufix }: ColumnInfoProps) {
  return (
    <div className="flex flex-col">
      {isHeader ? (
        <>
          <h1 className="text-foreground text-xl lg:text-sm font-semibold">{title}</h1>
          <p className="text-muted-foreground lg:text-sm">{subtitle}</p>
        </>
      ) : (
        <>
          <h1 className="text-muted-foreground uppercase lg:text-sm">{title}</h1>
          <p className="text-foreground text-2xl font-semibold lg:text-sm">
            {prefix} {subtitle} {sufix}
          </p>
        </>
      )}
    </div>
  )
}
