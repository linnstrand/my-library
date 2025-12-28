type HeaderProps = {
  view: 'grid' | 'list';
  sorting: 'nrBooksRead' | 'writer';
  onViewChange: (view: 'grid' | 'list') => void;
  onSortChange: (sortBy: 'nrBooksRead' | 'writer') => void;
};

export const Header = ({
  view,
  sorting,
  onViewChange,
  onSortChange,
}: HeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
      <div>
        <label>
          View:
          <select
            value={view}
            onChange={(e) => onViewChange(e.target.value as 'grid' | 'list')}
            className="ml-2"
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Sort:
          <select
            onChange={(e) =>
              onSortChange(e.target.value as 'nrBooksRead' | 'writer')
            }
            value={sorting}
            className="ml-2"
          >
            <option value="nrBooksRead">Nr Books Read</option>
            <option value="writer">Writer</option>
          </select>
        </label>
      </div>
    </div>
  );
};
