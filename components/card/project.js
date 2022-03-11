import PropTypes from "prop-types";
import { memo } from "react"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ProjectCard({project}) {
  return (
    <div className="cursor-pointer py-1">
      <h4 className="text-base font-medium text-gray-600">
        {project.ProjectName}
      </h4>

    </div>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
}

export default memo(ProjectCard)