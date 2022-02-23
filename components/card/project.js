import PropTypes from "prop-types";
import { memo } from "react"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ProjectCard({project}) {
  return (
    <div
      className="flex shadow-sm rounded-md my-3 bg-white h-16 w-80 cursor-pointer hover:opacity-90">
      <div
        className={classNames(
          "bg-blue-400",
          'flex-shrink-0 flex items-center rounded-l-md justify-center w-16 text-white text-sm font-medium'
        )}
      >
        AG
      </div>
      <div
        className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          {project.ProjectName}
        </div>
      </div>
    </div>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
}

export default memo(ProjectCard)