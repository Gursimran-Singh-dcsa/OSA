import type { NextPage } from 'next'
import FilterSection from '../components/Filters';
import LogbookTable from '../components/LogbookTable';

const LogBook: NextPage = () => {
  return (
    <div className="page">
      <FilterSection />
      <LogbookTable />
    </div>
  )
}

export default LogBook;
