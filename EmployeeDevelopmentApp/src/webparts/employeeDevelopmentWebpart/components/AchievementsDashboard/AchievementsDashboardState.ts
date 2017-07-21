import IAchievement from '../../models/IAchievement';

export interface AchievementsDashboardState{
  filterText?: string;
  filteredAchievements?: IAchievement[];
}