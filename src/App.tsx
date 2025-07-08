import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useLocation, useParams } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/contexts/AppContext";
import { CostProvider } from "@/contexts/CostContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import WebTrafficAnalyticsPage from "@/pages/WebTrafficAnalyticsPage";
import { 
  MonthlyStrategiesPage, 
  StrategyManagementPage,
  TaskCalendarPage,
  AnalysisChronologyPage
} from "@/pages/UpdatedPages";
import FinancialAnalyticsPage from "@/pages/FinancialAnalyticsPage";
import InboxPage from "@/pages/InboxPage";
import NotFound from "@/pages/NotFound";
import TaskManagementPage from "@/pages/TaskManagementPage";
import DocumentsPage from "@/pages/DocumentsPage";
import ProfilePage from "@/pages/ProfilePage";
import ComingSoonPage from "@/pages/ComingSoonPage";
import GManChatPage from "@/pages/GManChatPage";
import EnterAnalysisPage from "@/pages/EnterAnalysisPage";
import AnalysisDashboardPage from '@/pages/AnalysisDashboardPage';
import AnalysisPricingPage from '@/pages/AnalysisPricingPage';
import ChatPage from "@/pages/ChatPage";
import SatelliteImageryPage from "@/pages/SatelliteImageryPage";
import WeatherPage from "@/pages/WeatherPage";
import GeneralWeatherPage from "@/pages/GeneralWeatherPage";
import FieldVisitsPage from "@/pages/FieldVisitsPage";
import FieldTrialsPage from "@/pages/FieldTrialsPage";
import IrrigationCalculatorPage from "@/pages/IrrigationCalculatorPage";
import NTSProductRecommendatorPage from "@/pages/NTSProductRecommendatorPage";
import GrowingDegreeDaysPage from '@/pages/GrowingDegreeDaysPage';
import CropHealth from "@/components/satellite/CropHealth";
import TreatmentVariableManager from "@/components/fieldTrials/TreatmentVariableManager";
import DataCollectionManager from "@/components/fieldTrials/DataCollectionManager";
import DataEntryForm from "@/components/fieldTrials/DataEntryForm";
import AdvancedAnalytics from "@/components/fieldTrials/AdvancedAnalytics";
import TrialReportGenerator from "@/components/fieldTrials/TrialReportGenerator";
import WeatherIntegration from "@/components/fieldTrials/WeatherIntegration";
import SatelliteIntegration from "@/components/fieldTrials/SatelliteIntegration";
import FieldDesignerPage from '@/pages/FieldDesignerPage';
import CostManagementPage from '@/pages/CostManagementPage';
import ProductBatchProductionPage from '@/pages/ProductBatchProductionPage';
import ClientsPage from '@/pages/ClientsPage';
import TrialDetailsPage from '@/pages/TrialDetailsPage';
import VariableTreatmentDesignForm from '@/pages/VariableTreatmentDesignForm';
import DataCollectionEntryPage from '@/pages/DataCollectionEntryPage';
import DataSummaryPage from '@/pages/DataSummaryPage';
import AnalysisPage from '@/pages/AnalysisPage';
import StatisticsPage from '@/pages/StatisticsPage';
import NutritionFarmsPage from './pages/NutritionFarmsPage';
import DistributorNetworkPage from './pages/DistributorNetworkPage';
import EducationVideoPage from "@/pages/EducationVideoPage";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import VideoUploadManagerPage from "@/pages/VideoUploadManagerPage";
import PodcastPage from './pages/PodcastPage';
import EventsPage from './pages/EventsPage';
import EventCalendarPage from './pages/EventCalendarPage';
import EventDetailsPage from './pages/EventDetailsPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailsPage from './pages/ArticleDetailsPage';
import GrowLibraryPage from './pages/GrowLibraryPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import CourseManagementPage from './pages/CourseManagementPage';
import LandingPage from "@/pages/LandingPage";
import CourseCreatePage from './pages/CourseCreatePage';
import CertificatePage from './pages/CertificatePage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAddEventPage from './pages/AdminAddEventPage';
import AdminEventsTablePage from './pages/AdminEventsTablePage';
import AdminEditEventPage from './pages/AdminEditEventPage';
import EducationHealthIndexPage from './pages/EducationHealthIndexPage';
import ArcadeTriviaPage from './pages/education/ArcadeTriviaPage';
import CourseEditPage from './pages/CourseEditPage';
import AnalysisAnalyticsPage from '@/pages/AnalysisAnalyticsPage';
import TestRechartsBarChart from './pages/TestRechartsBarChart';
import PlantIDPage from './pages/PlantIDPage';
import InsectIDPage from './pages/InsectIDPage';
import MushroomIDPage from './pages/MushroomIDPage';
import CropHealthPage from './pages/CropHealthPage';
import SoilPlantLogicsPage from './pages/SoilPlantLogicsPage';
import SimulationsPage from './pages/NewEducationPage';

// Simple test component for debugging
const TestTrialDetails = () => {
  const { id } = useParams();
  return (
    <div style={{ padding: '20px', fontSize: '18px' }}>
      <h1>Test Trial Details Page</h1>
      <p>This is a test component to debug routing.</p>
      <p>Trial ID: {id}</p>
      <p>If you can see this, the route is working!</p>
    </div>
  );
};

// Create a client
const queryClient = new QueryClient();

// Configure React Router future flags to suppress deprecation warnings
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

// RequireAuth component to protect routes
function RequireAuth({ children }: { children: JSX.Element }) {
  const userStr = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
  const isAuthenticated = !!userStr;
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    // This effect runs once on app startup to clean up old data formats.
    try {
      const userStr = localStorage.getItem('currentUser');
      if (userStr) {
        const user = JSON.parse(userStr);
        // If the ID is a number, it's the old format.
        if (typeof user.id === 'number') {
          console.log('Old user data format detected. Clearing localStorage.');
          localStorage.removeItem('currentUser');
          // Optional: force a reload to ensure the user is logged out.
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Failed to parse user data from localStorage:', error);
      localStorage.removeItem('currentUser');
    }
  }, []);

  // Helper: redirect / to /app or /login
  function RootRedirect() {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    const isAuthenticated = !!userStr;
    if (isAuthenticated) {
      return <Navigate to="/app" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <AppProvider>
          <CostProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Router {...router}>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<RootRedirect />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/auth/callback" element={<AuthCallbackPage />} />
                  <Route path="/test-bar-chart" element={<TestRechartsBarChart />} />
                  <Route path="/test-trial/:id" element={
                    <div style={{ padding: '20px', fontSize: '18px', color: 'blue' }}>
                      <h1>Root Level Test Route</h1>
                      <p>This is a test route at the root level.</p>
                      <p>Trial ID: {useParams().id}</p>
                    </div>
                  } />
                  <Route path="/app" element={<RequireAuth><Layout><Outlet /></Layout></RequireAuth>}>
                    <Route index element={<DashboardPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="web-traffic" element={<WebTrafficAnalyticsPage />} />
                    <Route path="financial" element={<FinancialAnalyticsPage />} />
                    <Route path="task-management" element={<TaskManagementPage />} />
                    <Route path="task-calendar" element={<TaskCalendarPage />} />
                    <Route path="monthly-strategies" element={<MonthlyStrategiesPage />} />
                    <Route path="strategy-management" element={<StrategyManagementPage />} />
                    <Route path="inbox" element={<InboxPage />} />
                    <Route path="documents" element={<DocumentsPage />} />
                    <Route path="profile" element={<ComingSoonPage title="Profile Settings" description="Profile settings are temporarily unavailable." />} />
                    <Route path="agronomist/soil/create-chart" element={<ComingSoonPage title="Create Soil Chart" description="Create detailed soil analysis charts for agricultural planning." />} />
                    <Route path="agronomist/soil/create-report" element={<ComingSoonPage title="Create Soil Report" description="Generate comprehensive soil analysis reports." />} />
                    <Route path="agronomist/soil/reports" element={<ComingSoonPage title="View Saved Reports" description="Access and review previously created soil analysis reports." />} />
                    <Route path="agronomist/plant/create-chart" element={<ComingSoonPage title="Create Leaf Chart" description="Create detailed leaf analysis charts for plant health assessment." />} />
                    <Route path="agronomist/plant/create-report" element={<ComingSoonPage title="Create Leaf Report" description="Generate comprehensive leaf analysis reports." />} />
                    <Route path="agronomist/plant/reports" element={<ComingSoonPage title="View Saved Reports" description="Access and review previously created leaf analysis reports." />} />
                    <Route path="agronomist/analysis/enter" element={<EnterAnalysisPage />} />
                    <Route path="agronomist/analysis/reports" element={<AnalysisDashboardPage />} />
                    <Route path="agronomist/analysis/pricing" element={<AnalysisPricingPage />} />
                    <Route path="agronomist/analysis/chronology" element={<AnalysisChronologyPage />} />
                    <Route path="agronomist/chat" element={<ChatPage />} />
                    <Route path="agronomist/satellite/crop-health" element={<CropHealth />} />
                    <Route path="agronomist/satellite/weather" element={<WeatherPage />} />
                    <Route path="agronomist/weather" element={<GeneralWeatherPage />} />
                    <Route path="agronomist/smart-tools/irrigation/calculation" element={<IrrigationCalculatorPage />} />
                    <Route path="agronomist/smart-tools/crop-nutrition/recommendator" element={<NTSProductRecommendatorPage />} />
                    <Route path="agronomist/smart-tools/crop-protection/gdd" element={<GrowingDegreeDaysPage />} />
                    <Route path="agronomist/inbox" element={<ComingSoonPage title="G.R.O.W Messaging" description="Access your G.R.O.W messaging inbox." />} />
                    <Route path="agronomist/fertiliser-prices" element={<ComingSoonPage title="Fertiliser Prices" description="Current market prices and trends for fertilisers." />} />
                    <Route path="agronomist/documents" element={<DocumentsPage />} />
                    <Route path="agronomist/crop-nutrition" element={<ComingSoonPage title="Crop Nutrition Thresholds" description="Monitor and manage crop nutrition thresholds and guidelines." />} />
                    <Route path="agronomist/soil-plant-logics" element={<SoilPlantLogicsPage />} />
                    <Route path="admin/overview" element={<DashboardPage />} />
                    <Route path="admin/web-traffic" element={<WebTrafficAnalyticsPage />} />
                    <Route path="admin/financial" element={<FinancialAnalyticsPage />} />
                    <Route path="admin/task-calendar" element={<TaskCalendarPage />} />
                    <Route path="admin/monthly-strategies" element={<MonthlyStrategiesPage />} />
                    <Route path="admin/inbox" element={<InboxPage />} />
                    <Route path="super-admin/task-management" element={<TaskManagementPage />} />
                    <Route path="super-admin/strategy-management" element={<StrategyManagementPage />} />
                    <Route path="super-admin/cost-management" element={<CostManagementPage />} />
                    <Route path="super-admin/income-management" element={<ComingSoonPage title="Income Management" description="Track and manage income streams and revenue." />} />
                    <Route path="super-admin/add-event" element={<AdminAddEventPage />} />
                    <Route path="super-admin/events-table" element={<AdminEventsTablePage />} />
                    <Route path="super-admin/edit-event/:id" element={<AdminEditEventPage />} />
                    <Route path="agronomist/field-visits" element={<FieldVisitsPage />} />
                    <Route path="agronomist/clients" element={<ClientsPage />} />
                    
                    {/* Field Trials Routes - Dynamic routes first */}
                    <Route path="agronomist/field-trials/:id" element={<TrialDetailsPage />} />
                    <Route path="agronomist/field-trials/:id/analytics/analysis" element={<AnalysisPage />} />
                    <Route path="agronomist/field-trials/:id/analytics/statistics" element={<StatisticsPage />} />
                    <Route path="agronomist/field-trials/:id/treatments" element={<TreatmentVariableManager />} />
                    <Route path="agronomist/field-trials" element={<FieldTrialsPage />} />
                    
                    {/* Field Trials Sub-routes */}
                    <Route path="agronomist/field-trials/treatments" element={<TreatmentVariableManager />} />
                    <Route path="agronomist/field-trials/data-collection" element={<DataCollectionManager />} />
                    <Route path="agronomist/field-trials/data-summary" element={<DataSummaryPage />} />
                    <Route path="agronomist/field-trials/data-entry" element={<DataEntryForm />} />
                    <Route path="agronomist/field-trials/analytics" element={<AdvancedAnalytics />} />
                    <Route path="agronomist/field-trials/reports" element={<TrialReportGenerator />} />
                    <Route path="agronomist/field-trials/weather" element={<WeatherIntegration />} />
                    <Route path="agronomist/field-trials/satellite" element={<SatelliteIntegration />} />
                    <Route path="agronomist/field-trials/design" element={<FieldDesignerPage />} />
                    <Route path="agronomist/field-trials/analytics/analysis" element={<AnalysisPage />} />
                    <Route path="agronomist/field-trials/analytics/statistics" element={<StatisticsPage />} />
                    
                    <Route path="agronomist/product-batch-production" element={<ProductBatchProductionPage />} />
                    <Route path="agronomist/nutrition-farms" element={<NutritionFarmsPage />} />
                    <Route path="agronomist/distributor-network" element={<DistributorNetworkPage />} />
                    <Route path="education/library" element={<GrowLibraryPage />} />
                    <Route path="education/online-learning/courses" element={<CoursesPage />} />
                    <Route path="education/online-learning/courses/:courseId" element={<CourseDetailPage />} />
                    <Route path="education/online-learning/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
                    <Route path="education/online-learning/course-management" element={<CourseManagementPage />} />
                    <Route path="education/online-learning/podcast" element={<PodcastPage />} />
                    <Route path="education/online-learning/videos" element={<EducationVideoPage />} />
                    <Route path="education/video-upload-manager" element={<VideoUploadManagerPage />} />
                    <Route path="education/health-index" element={<EducationHealthIndexPage />} />
                    <Route path="education/events" element={<ComingSoonPage title="Events" description="Stay updated with upcoming educational events, workshops, and conferences." />} />
                    <Route path="education/articles" element={<ArticlesPage />} />
                    <Route path="education/articles/:id" element={<ArticleDetailsPage />} />
                    <Route path="education/arcade/trivia" element={<ArcadeTriviaPage />} />
                    <Route path="events" element={<EventsPage />} />
                    <Route path="events/calendar" element={<EventCalendarPage />} />
                    <Route path="events/:id" element={<EventDetailsPage />} />
                    <Route path="education/online-learning/course-create" element={<CourseCreatePage />} />
                    <Route path="education/online-learning/courses/:courseId/certificate" element={<CertificatePage />} />
                    <Route path="trials/:id" element={<TrialDetailsPage />} />
                    <Route path="trials/:id/variable-design" element={<VariableTreatmentDesignForm />} />
                    <Route path="trials/:id/data-entry" element={<DataCollectionEntryPage />} />
                    <Route path="education/online-learning/course-edit/:id" element={<CourseEditPage />} />
                    <Route path="agronomist/field-trials/:id/data-collection" element={<DataCollectionManager />} />
                    <Route path="agronomist/analysis/analytics" element={<AnalysisAnalyticsPage />} />
                    <Route path="agronomist/plant-id" element={<PlantIDPage />} />
                    <Route path="agronomist/insect-id" element={<InsectIDPage />} />
                    <Route path="agronomist/mushroom-id" element={<MushroomIDPage />} />
                    <Route path="agronomist/crop-health" element={<CropHealthPage />} />
                    <Route path="education/new-page" element={<SimulationsPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </Router>
            </TooltipProvider>
          </CostProvider>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;