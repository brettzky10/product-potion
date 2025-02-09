import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Bot, HelpCircle, LineChart, UserCircle } from 'lucide-react'

export default function SquadLanding() {
  return (
    <div className="container mx-auto px-12 py-12 space-y-24 max-w-9xl">
      {/* Analyst Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500">
                <LineChart className="w-12 h-12 text-white" />
              </Avatar>
              <span className="absolute bottom-0 right-0 bg-white rounded-full px-2 py-1 text-sm font-medium border">
                @Analyst
              </span>
            </div>
          </div>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-2">
              • Turn the numbers and ratios reports easy to understand
            </li>
            <li className="flex items-start gap-2">
              • Get a full picture of your business performance
            </li>
            <li className="flex items-start gap-2">
              • Ask @Analyst, What is my revenue this year compared to last year?
            </li>
          </ul>
        </div>
        <Card className="p-4 shadow-lg">
          <img
            src="/images/app-ui.png"
            alt="Analyst Chat Interface"
            className="w-full rounded-lg"
          />
        </Card>
      </section>

      {/* CSR Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
        <div className="space-y-6 md:order-2">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500">
                {/* <UserCircle className="w-12 h-12 text-white" /> */}
                <AvatarImage src="/images/trainer-2.jpg" className="h-12 w-12"/>

                
              </Avatar>
              <span className="absolute bottom-0 right-0 bg-white rounded-full px-2 py-1 text-sm font-medium border">
                @CSR
              </span>
            </div>
          </div>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-2">
              • Operates customer relations and handles your daily customer service inquiries
            </li>
            <li className="flex items-start gap-2">
              • Answers calls and leads jobs, freeing up your time to grow your business
            </li>
          </ul>
        </div>
        <Card className="p-4 shadow-lg md:order-1">
          <img
            src="/images/app-ui.png"
            alt="CSR Chat Interface"
            className="w-full rounded-lg"
          />
          {/* <Video
            src="/placeholder.mp4"
            width={600}
            height={400}
            controls
            className="w-full rounded-lg"
            /> */}
        </Card>
      </section>

      {/* Coach Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500">
                <Bot className="w-12 h-12 text-white" />
              </Avatar>
              <span className="absolute bottom-0 right-0 bg-white rounded-full px-2 py-1 text-sm font-medium border">
                @Coach
              </span>
            </div>
          </div>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-2">
              • Get expert advice on how to succeed as a business owner
            </li>
            <li className="flex items-start gap-2">
              • Learn how to generate more jobs, what to fix for growth, and much more
            </li>
            <li className="flex items-start gap-2">
              • Ask @Coach, How can I generate more jobs for my business?
            </li>
          </ul>
        </div>
        <Card className="p-4 shadow-lg">
          <img
            src="/images/app-ui.png"
            alt="Coach Chat Interface"
            className="w-full rounded-lg"
          />
        </Card>
      </section>

      {/* Help Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
        <div className="space-y-6 md:order-2">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500">
                <HelpCircle className="w-12 h-12 text-white" />
              </Avatar>
              <span className="absolute bottom-0 right-0 bg-white rounded-full px-2 py-1 text-sm font-medium border">
                @Help
              </span>
            </div>
          </div>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-2">
              • Learn how to use Housecall Pro to add jobs and schedule work
            </li>
            <li className="flex items-start gap-2">
              • Get assistance with setup of your financial Pro account, ongoing support and troubleshooting
            </li>
            <li className="flex items-start gap-2">
              • Ask @Help "How can I send a marketing campaign?"
            </li>
          </ul>
        </div>
        <Card className="p-4 shadow-lg md:order-1">
          <img
            src="/images/app-ui.png"
            alt="Help Chat Interface"
            className="w-full rounded-lg"
          />
        </Card>
      </section>
    </div>
  )
}