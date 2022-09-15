import type { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children?: ReactNode
}

export const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col space-y-6 bg-slate-700">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/registration">Registration</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
