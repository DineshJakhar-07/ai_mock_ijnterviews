import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser, getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/auth.action";
const Page = async() => {
  const user = await getCurrentUser();
  const [userinterviews, latestinterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({userId: user?.id!})
  ]);
  const haspastinterviews = userinterviews?.length > 0;
  const hasUpcomingInterviews = latestinterviews?.length > 0;
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {
            haspastinterviews ? (
              userinterviews?.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))) : (
              <p>You have no interviews available</p>
            )
          }
        </div> 
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
        {
            hasUpcomingInterviews ? (
              latestinterviews?.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))) : (
              <p>You have no interviews available</p>
            )
          }
            <p>There are no interviews available</p>
        </div>
      </section>
    </>
  );
}

export default Page;
