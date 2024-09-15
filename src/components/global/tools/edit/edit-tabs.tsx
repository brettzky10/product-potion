"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import RemovalTool from "@/components/global/tools/removal/bg-removal"
import ResizeComponent from "@/components/global/tools/resize/resize-card"
//import ReBlurTool from "@/components/tools/bokeh"
import ResizePhoneComponent from "@/components/global/tools/resize/resize-phone"
//import StageTool from "@/components/tools/stage"
import LightingTool from "@/components/global/tools/lighting"
import CreditsBadge from "../../navbar/credits-button"
 
export default function EditTabs() {
  return (
    <> 
      
    <div className="max-h-[60vh]">
      <Tabs defaultValue="remove" className="mx-auto max-w-4xl sm:w-[550px] md:w-[700px] lg:w-[900px] ">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="remove">Remove</TabsTrigger>
          {/* <TabsTrigger value="replace">Replace</TabsTrigger> */}
          <TabsTrigger value="relight">Relight</TabsTrigger>
{/*           <TabsTrigger value="reblur">Blur</TabsTrigger> */}
          <TabsTrigger value="resize">Resize</TabsTrigger>
        </TabsList>
        <TabsContent value="remove" className="">
        <Card className="bg-gradient-to-br from-pink-800/20 to-gray-900">
            <CardHeader className="ml-5 md:ml-14">
              <CardTitle>Remove</CardTitle>
              <CardDescription>
                Remove Background from Images.
              </CardDescription>
              <CreditsBadge/>
            </CardHeader>
            
            <CardContent className="space-y-2">
            
              <RemovalTool/>
            </CardContent>
          </Card>
        </TabsContent>
        {/* <TabsContent value="replace">
          <Card className="bg-gradient-to-t from-primary dark:from-primary-foreground via-primary dark:via-primary-foreground to-emerald-700/20 dark:to-emerald-600/30">
          <CardHeader className="ml-5 md:ml-14">
              <CardTitle>Replace</CardTitle>
              <CardDescription>
                Generate a background for a Product
              </CardDescription>
            </CardHeader>
            <CardContent >
              <StageTool/>
            </CardContent>
          </Card>
        </TabsContent> */}
        <TabsContent value="relight" className="">
        <Card className="bg-gradient-to-t from-themeDarkGray via-themeDarkGray to-sand">
            <CardHeader className="ml-5 md:ml-14">
              <CardTitle>Lighting</CardTitle>
              <CardDescription>
                Lighting Background from Images.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
            
              <LightingTool/>
            </CardContent>
            {/* <CardFooter>
              <Button>Lighting</Button>
            </CardFooter> */}
          </Card>
        </TabsContent>
        {/* <TabsContent value="reblur">
          <Card className="bg-gradient-to-t from-primary dark:from-primary-foreground via-primary dark:via-primary-foreground to-blue-700/20 dark:to-blue-600/30">
          <CardHeader className="ml-5 md:ml-14">
              <CardTitle>Blur</CardTitle>
              <CardDescription>
                Blur the background to enhance your product
              </CardDescription>
            </CardHeader>
            <CardContent >
              <ReBlurTool/>
            </CardContent>
          </Card>
        </TabsContent> */}
        <TabsContent value="resize">
          <Card className="bg-gradient-to-t from-themeGray via-themeTextGray to-sand">
          <CardHeader className="ml-5 md:ml-14">
              <CardTitle>Resize</CardTitle>
              <CardDescription>
                Resize the image to your dimensions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className='flex flex-col md:flex-row p-10 justify-center items-center space-x-10 max-h-[70vh]'>
                  <ResizeComponent/>
                  <ResizePhoneComponent/>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </>
  )
}