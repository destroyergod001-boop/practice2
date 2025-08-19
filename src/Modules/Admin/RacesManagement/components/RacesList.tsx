import React from 'react';
import { Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@core/ui/Button';
import { Card } from '@core/ui/Card';
import { LoadingSpinner } from '@core/ui/LoadingSpinner';
import { SearchInput } from '@core/ui/SearchInput';
import { Pagination } from '@core/ui/Pagination';
import { RaceModel } from '@core/Model/Race';
import { useRacesListController, SortField, SortDirection } from '../controllers/RacesListController';

interface RacesListProps {
  onEdit: (race: RaceModel) => void;
  onDelete: (id: number) => void;
}

export const RacesList: React.FC<RacesListProps> = ({ onEdit, onDelete }) => {
  const { state, controller, filteredRaces, paginatedRaces, totalPages } = useRacesListController();

  const handleSort = (field: SortField) => {
    const newDirection: SortDirection = 
      state.sortField === field && state.sortDirection === 'asc' ? 'desc' : 'asc';
    controller.setSorting(field, newDirection);
  };

  const getSortIcon = (field: SortField) => {
    if (state.sortField !== field) return <ArrowUpDown className="w-4 h-4" />;
    return state.sortDirection === 'asc' ? 
      <ArrowUp className="w-4 h-4" /> : 
      <ArrowDown className="w-4 h-4" />;
  };

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const success = await controller.deleteRace(id);
      if (success) {
        onDelete(id);
      } else {
        alert('Failed to delete race');
      }
    }
  };

  if (state.loading) {
    return (
      <Card className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading races..." />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchInput
          value={state.searchQuery}
          onChange={controller.setSearchQuery.bind(controller)}
          placeholder="Search races..."
          className="w-full sm:w-96"
        />
        
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Show:</label>
          <select
            value={state.itemsPerPage}
            onChange={(e) => controller.setItemsPerPage(parseInt(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600 dark:text-gray-400">per page</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-100"
                  >
                    Name {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('category')}
                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-100"
                  >
                    Category {getSortIcon('category')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('tier')}
                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-100"
                  >
                    Tier {getSortIcon('tier')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('level')}
                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-100"
                  >
                    Level {getSortIcon('level')}
                  </button>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedRaces.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    {state.searchQuery ? 'No races found matching your search.' : 'No races found. Create your first race to get started.'}
                  </td>
                </tr>
              ) : (
                paginatedRaces.map((race) => (
                  <tr key={race.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {race.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-300 max-w-xs truncate">
                        {race.description || 'No description'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {race.tier}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(race)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(race.id, race.name)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={state.currentPage}
            totalPages={totalPages}
            onPageChange={controller.setCurrentPage.bind(controller)}
            itemsPerPage={state.itemsPerPage}
            totalItems={filteredRaces.length}
          />
        )}
      </div>
    </div>
  );
};