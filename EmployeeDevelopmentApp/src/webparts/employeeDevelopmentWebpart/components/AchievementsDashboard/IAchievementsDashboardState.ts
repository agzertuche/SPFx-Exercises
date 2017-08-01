import IAchievement from '../../models/IAchievement';

export interface IAchievementsDashboardState{
  filterText?: string;
  filteredAchievements?: IAchievement[];
}