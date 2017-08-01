import IDataProvider from '../../dataProviders/IDataProvider';
import { MenuItem } from '../../models/Enums';

export interface IMainProps {
  dataProvider: IDataProvider;
}

export const menuItems = [
  {
    itemKey: MenuItem.Cards,
    linkText: 'Cards',
    itemIcon: 'ContactCard',    
  },
  {
    itemKey: MenuItem.Information,
    linkText: 'Information',
    itemIcon: 'ThumbnailView',    
  },
  {
    itemKey: MenuItem.Achievements,
    linkText: 'Achievements',
    itemIcon: 'Trophy',    
  },
  {
    itemKey: MenuItem.Performance,
    linkText: 'Performance',
    itemIcon: 'BarChart4',    
  },
];