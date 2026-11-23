import {
  ArrowUpRight,
  Building2,
  ChartNoAxesColumnIncreasing,
  Clock3,
  Cloud,
  ExternalLink,
  FileText,
  FolderOpen,
  Search,
  ShoppingBag,
  Upload,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

function BrowserChrome({ title }) {
  return (
    <div className="browser-bar" aria-hidden="true">
      <span />
      <span />
      <span />
      <i>{title}</i>
    </div>
  );
}

function FocusArtwork() {
  return (
    <div className="focus-preview" aria-hidden="true">
      <div className="focus-preview-ring">
        <div className="focus-preview-core"><Clock3 size={29} strokeWidth={1.4} /></div>
      </div>
      <div className="focus-preview-chart">
        <ChartNoAxesColumnIncreasing size={17} />
        <div className="focus-preview-bars"><i /><i /><i /><i /><i /><i /></div>
      </div>
      <span className="focus-preview-orbit" />
    </div>
  );
}

function StoreArtwork() {
  return (
    <div className="store-preview" aria-hidden="true">
      <div className="store-preview-products">
        <div className="store-preview-product store-preview-product--one" />
        <div className="store-preview-product store-preview-product--two" />
        <div className="store-preview-product store-preview-product--three" />
      </div>
      <div className="store-preview-bag"><ShoppingBag size={42} strokeWidth={1.25} /></div>
      <span className="store-preview-sun" />
    </div>
  );
}

function JobsArtwork() {
  return (
    <div className="jobs-preview" aria-hidden="true">
      <div className="jobs-preview-toolbar">
        <span className="jobs-preview-brand"><Building2 size={15} /></span>
        <span className="jobs-preview-search"><Search size={13} /><i /></span>
        <span className="jobs-preview-avatar" />
      </div>
      <div className="jobs-preview-layout">
        <div className="jobs-preview-sidebar"><i /><i /><i /><i /></div>
        <div className="jobs-preview-list">
          <div className="jobs-preview-row"><span /><div><i /><i /></div><b /></div>
          <div className="jobs-preview-row"><span /><div><i /><i /></div><b /></div>
          <div className="jobs-preview-row"><span /><div><i /><i /></div><b /></div>
        </div>
      </div>
    </div>
  );
}

function DriveArtwork() {
  return (
    <div className="drive-preview" aria-hidden="true">
      <div className="drive-preview-toolbar">
        <Cloud size={17} />
        <span className="drive-preview-upload"><Upload size={12} /></span>
      </div>
      <div className="drive-preview-layout">
        <div className="drive-preview-sidebar"><i /><i /><i /><i /></div>
        <div className="drive-preview-files">
          <div><FolderOpen size={19} /><i /></div>
          <div><FileText size={19} /><i /></div>
          <div><FileText size={19} /><i /></div>
          <div><FolderOpen size={19} /><i /></div>
        </div>
      </div>
    </div>
  );
}

const artworkByType = {
  focus: FocusArtwork,
  store: StoreArtwork,
  jobs: JobsArtwork,
  drive: DriveArtwork,
};

function ProjectVisual({ project }) {
  const Artwork = artworkByType[project.visual];
  return (
    <div
      className={`project-visual project-visual--${project.visual}`}
    >
      {project.coverImage ? (
        <img
          className="project-cover-image"
          src={project.coverImage}
          alt={project.coverAlt}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="project-browser" role="img" aria-label={`${project.title}, ${project.subtitle}`}>
          <BrowserChrome title={project.title} />
          {Artwork && <Artwork />}
        </div>
      )}
    </div>
  );
}

export default function ProjectCard({ project, projectLabel, liveLabel, sourceLabel, index }) {
  const reduceMotion = useReducedMotion();
  const layout = project.layout || 'featured';

  return (
    <motion.article
      className={`project-card project-card--${layout}`}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, delay: reduceMotion ? 0 : (index % 2) * 0.08 }}
    >
      <ProjectVisual project={project} />
      <div className="project-content">
        <div className="project-overline">
          <span>{projectLabel} {project.number}</span>
          <span className="project-overline-line" />
        </div>
        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.description}</p>
        {project.tech.length > 0 && (
          <ul className="badge-list project-tech">
            {project.tech.map((item) => <li className="skill-badge" key={item}>{item}</li>)}
          </ul>
        )}
        {project.points.length > 0 && (
          <ul className="detail-list project-points">
            {project.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        )}
        <div className="project-actions">
          <a className="button button--project-primary" href={project.liveHref} target="_blank" rel="noopener noreferrer">
            {liveLabel}<ExternalLink size={15} aria-hidden="true" />
          </a>
          <a className="button button--project-secondary" href={project.sourceHref} target="_blank" rel="noopener noreferrer">
            {sourceLabel}<ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
