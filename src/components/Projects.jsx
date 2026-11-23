import { ArrowUpRight } from 'lucide-react';
import { portfolioData as data } from '../data/portfolioData.js';
import SectionHeading from './SectionHeading.jsx';
import ProjectCard from './ProjectCard.jsx';

export default function Projects() {
  const section = data.projects;
  return (
    <section className="section-wrap" id={section.id} aria-labelledby="projects-title">
      <div className="page-container">
        <SectionHeading headingId={`${section.id}-title`} eyebrow={section.eyebrow} title={section.title} description={section.description} />
        <div className="projects-list">{section.items.map((project, index) => <ProjectCard key={project.title} project={project} projectLabel={section.projectLabel} liveLabel={section.liveLabel} sourceLabel={section.sourceLabel} index={index} />)}</div>
        <div className="all-projects-wrap"><a className="button button--outline" href={section.allHref} target="_blank" rel="noopener noreferrer">{section.allLabel}<ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
