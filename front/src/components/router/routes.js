import Dashboard from '../../pages/dashboard/Dashboard';
import Finalize from '../../pages/finalize/Finalize';
import Results from '../../pages/results/Results';


export const routes =[
  {path: '/', component: Dashboard, exact: true},
  {path: '/finalize/:testId', component: Finalize, exact: true},
  {path: '/results/:testId', component: Results, exact: true},
]

