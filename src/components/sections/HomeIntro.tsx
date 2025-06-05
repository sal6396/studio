import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { COMPANY_NAME } from '@/lib/constants';
import { Lightbulb, Users, Target } from 'lucide-react';

export function HomeIntro() {
  const features = [
    {
      icon: <Lightbulb className="h-10 w-10 text-primary mb-4" />,
      title: "Innovation",
      description: "We constantly explore new technologies to deliver cutting-edge solutions."
    },
    {
      icon: <Users className="h-10 w-10 text-primary mb-4" />,
      title: "Expert Team",
      description: "Our experienced professionals are dedicated to your project's success."
    },
    {
      icon: <Target className="h-10 w-10 text-primary mb-4" />,
      title: "Client-Focused",
      description: "We prioritize your needs, ensuring solutions are tailored to your goals."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to <span className="text-primary">{COMPANY_NAME}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are a passionate team of software engineers, designers, and strategists committed to transforming ideas into powerful digital realities. Our mission is to provide top-tier technology services that help businesses thrive in an ever-evolving digital landscape.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center">{feature.icon}</div>
                <CardTitle className="text-2xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
