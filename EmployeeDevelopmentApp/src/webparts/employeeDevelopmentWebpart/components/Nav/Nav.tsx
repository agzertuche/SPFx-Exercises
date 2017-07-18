// import * as React from 'react';
// import { INavProps } from './INavProps';
// import {
//   Pivot,
//   PivotItem,
//   PivotLinkFormat,
//   PivotLinkSize
// } from 'office-ui-fabric-react/lib/Pivot';
// import EmployeeCards from '../EmployeeCards';
// import AchievementsDashboard from '../AchievementsDashboard';
// import PerformanceDashboard from '../PerformanceDashboard';
// import EmployeeInformation from '../EmployeeInformation';

// export default class Nav extends React.Component<INavProps, {}>{
//   public render(): React.ReactElement<INavProps>{
//     return (      
//       <div className="ms-Grid-row">
//         <div className="ms-Grid-col ms-u-sm12 ms-u-hiddenMdUp">
//           <Pivot linkFormat={ PivotLinkFormat.tabs } linkSize={ PivotLinkSize.large }>            
//             <PivotItem itemIcon='ContactCard'>
//               {/* <EmployeeCards /> */}
//             </PivotItem>
//             <PivotItem itemIcon='ThumbnailView'>
//               {/* <EmployeeInformation /> */}
//             </PivotItem>
//             <PivotItem itemIcon='Trophy'>
//               <AchievementsDashboard />
//             </PivotItem>
//             <PivotItem itemIcon='BarChart4'>
//               <PerformanceDashboard />
//             </PivotItem>
//           </Pivot>
//         </div>
//         <div className="ms-Grid-col ms-u-md12 ms-u-hiddenSm">
//           <Pivot linkFormat={ PivotLinkFormat.tabs } linkSize={ PivotLinkSize.large }>            
//             <PivotItem linkText='Cards' itemIcon='ContactCard'>
//               {/* <EmployeeCards /> */}
//             </PivotItem>
//             <PivotItem linkText='Information' itemIcon='ThumbnailView'>
//               {/* <EmployeeInformation /> */}
//             </PivotItem>
//             <PivotItem linkText='Achievements' itemIcon='Trophy'>
//               <AchievementsDashboard />
//             </PivotItem>
//             <PivotItem linkText='Performance' itemIcon='BarChart4'>
//               <PerformanceDashboard />
//             </PivotItem>
//           </Pivot>
//         </div>
//       </div>
//     );
//   }
// }