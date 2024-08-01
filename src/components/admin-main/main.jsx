import React from 'react'
import Line from '../../components/charts/linechart/line'
import Cards from '../../components/admin-sale-cards/cards'
import Options from '../../components/options/options'
import Bar from '../../components/charts/bar-graph/bar'
import { dateCards } from '../../dates/jummy'
import DashboardPost from '../admin_potensi/potensi_component'
const Main = () => {
  return (
    <div className="p-6 mb-6 bg-slate-50 min-h-screen font-[Poppins]">
      {/* <div className="">
          <Options />
        </div> */}

      <div className="">
        <Cards />
      </div>
    </div>
  );
};

export default Main;