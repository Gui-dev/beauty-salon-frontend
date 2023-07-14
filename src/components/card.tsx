import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'
import Link from 'next/link'
import colors from 'tailwindcss/colors'
import { getHours, isAfter, parseISO } from 'date-fns'

interface ICardProps {
  id: string
  user_id: string
  name: string
  phone: string
  date: string
}

export const Card = ({ id, name, phone, date }: ICardProps) => {
  const dateParsed = parseISO(date)
  const isAfterDate = isAfter(dateParsed, new Date())
    ? 'flex items-center justify-center w-16 rounded-l-lg bg-secondary p-3 text-sm font-bold text-white'
    : 'flex items-center justify-center w-16 rounded-l-lg bg-gray-500 py-3 text-sm font-bold text-white'
  const hour = getHours(dateParsed)
  let phoneFormatted = phone.replace(/\D/g, '')
  phoneFormatted = phoneFormatted.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')

  return (
    <div className="mb-6 flex items-center justify-between rounded-lg bg-white shadow-lg">
      <div className="flex flex-row items-center gap-4">
        <span className={isAfterDate}>{hour}h</span>
        <div className="flex flex-col gap-1">
          <p className="text-base text-primary-900">{name}</p>
          <p className="text-xs text-primary-800">{phoneFormatted}</p>
        </div>
      </div>
      <div className="mr-3 flex flex-row items-center gap-4">
        <Link href={`/schedules/${id}`}>
          <AiOutlineEdit size={20} color={colors.green[800]} />
        </Link>
        <button>
          <RiDeleteBinLine size={20} color={colors.red[800]} />
        </button>
      </div>
    </div>
  )
}
