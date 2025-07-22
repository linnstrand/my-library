type HeaderProps = {
  onViewChange: (view: 'grid' | 'list') => void;
  onSortChange?: (sortBy: 'title' | 'writer' | 'year') => void;
};

export const Header = ({ onViewChange }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
      <div>
        <label>
          View:
          <select
            onChange={(e) => onViewChange(e.target.value as 'grid' | 'list')}
            className="ml-2"
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </label>
      </div>
      {/* <div>
        <label>
          Sort:
          <select
            onChange={(e) =>
              onSortChange(e.target.value as 'title' | 'writer' | 'year')
            }
            className="ml-2"
          >
            <option value="title">Title</option>
            <option value="writer">Writer</option>
            <option value="year">Year Written</option>
          </select>
        </label>
      </div> */}
    </div>
  );
};
