import Hero from '../components/Hero';
import AcademyDirectorFocus from '../components/AcademyDirectorFocus';
import LearningTransformation from '../components/LearningTransformation';
import ScienceOfLearning from '../components/ScienceOfLearning';
import EngagingContent from '../components/EngagingContent';

export default function LandingPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      <div className="snap-start"><Hero /></div>
      <div className="snap-start"><AcademyDirectorFocus /></div>
      <div><LearningTransformation /></div>
      <div><ScienceOfLearning /></div>
      <div className="snap-start"><EngagingContent /></div>
    </div>
  );
}
