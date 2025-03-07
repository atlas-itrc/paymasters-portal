
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const Index = () => {
  const features = [
    {
      title: 'Integrated with Oracle HCM',
      description: 'Seamlessly connects with your existing HR systems for accurate employee data.',
      icon: <Shield className="h-10 w-10 text-primary" />
    },
    {
      title: 'Automated Salary Processing',
      description: 'Calculate salaries with all benefits and deductions automatically.',
      icon: <Clock className="h-10 w-10 text-primary" />
    },
    {
      title: 'PDF Salary Slips',
      description: 'Generate professional salary slips for your employees with just a click.',
      icon: <CreditCard className="h-10 w-10 text-primary" />
    },
    {
      title: 'Bank Transfer Integration',
      description: 'Create bank payment files for seamless salary disbursement.',
      icon: <CheckCircle2 className="h-10 w-10 text-primary" />
    }
  ];

  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    hero: false,
    features: false,
    benefits: false,
    cta: false
  });

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    benefits: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setIsVisible(prev => ({ ...prev, [id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section 
        id="hero" 
        ref={sectionRefs.hero}
        className={cn(
          "pt-32 pb-20 md:pt-40 md:pb-32 px-6 transition-opacity duration-1000",
          isVisible.hero ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground">
              Modern Payroll <span className="text-primary">Simplified</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Streamline your payroll process with our intuitive platform. Automatically calculate salaries, 
              generate slips, and manage employee benefits with ease.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/salary-slip">
                  View Demo
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-20 relative">
            <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl animate-float">
              <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background pointer-events-none z-10" />
              <img 
                src="https://images.unsplash.com/photo-1586343276471-c02138479e9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                alt="PayMaster Dashboard" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div 
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 glassmorphism rounded-xl p-6 w-[90%] max-w-5xl shadow-lg"
            >
              <div className="flex flex-wrap justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm font-medium text-foreground">Trusted by leading companies worldwide</p>
                  <p className="text-xs text-muted-foreground mt-1">Supporting businesses across all industries</p>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-foreground/70 font-medium text-sm">Oracle</div>
                  <div className="text-foreground/70 font-medium text-sm">Microsoft</div>
                  <div className="text-foreground/70 font-medium text-sm">HSBC</div>
                  <div className="text-foreground/70 font-medium text-sm">ADP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        id="features" 
        ref={sectionRefs.features}
        className={cn(
          "py-20 md:py-32 px-6 bg-muted/30 transition-opacity duration-1000 ease-out",
          isVisible.features ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              Everything you need to manage payroll
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive payroll system handles all aspects of employee compensation management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={cn(
                  "bg-background rounded-xl p-6 border border-border transition-all duration-300 hover:shadow-md",
                  isVisible.features ? "animate-scale-in opacity-100" : "opacity-0",
                  isVisible.features && `animation-delay-${index * 100}`
                )}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards' 
                }}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section 
        id="benefits" 
        ref={sectionRefs.benefits}
        className={cn(
          "py-20 md:py-32 px-6 transition-opacity duration-1000",
          isVisible.benefits ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
                  Comprehensive Employee Benefits Management
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Manage all aspects of employee compensation with our integrated benefits system
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: 'Basic Salary Management',
                    description: 'Configure and manage base salaries for all employees'
                  },
                  {
                    title: 'Housing Allowances',
                    description: 'Set up housing benefit calculations based on employee grade and location'
                  },
                  {
                    title: 'Cost of Living Adjustments',
                    description: 'Automatically apply COLA based on inflation data and employee location'
                  },
                  {
                    title: 'Utilities & Other Benefits',
                    description: 'Manage additional benefits like utilities, transportation, and meal allowances'
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex items-start",
                      isVisible.benefits ? "animate-slide-up opacity-100" : "opacity-0"
                    )}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'forwards' 
                    }}
                  >
                    <div className="mt-1 mr-4 rounded-full p-1 bg-primary/10 text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button asChild>
                  <Link to="/dashboard">
                    Explore Features <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden h-[500px] shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1556155092-8707de31f9c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Benefits Dashboard" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              
              <div className="absolute -bottom-6 -right-6 glassmorphism rounded-xl p-6 max-w-sm shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium">Salary Breakdown</h4>
                  <span className="text-xs text-muted-foreground">July 2023</span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: 'Basic Salary', value: '$3,500', percentage: '70%' },
                    { label: 'Housing Allowance', value: '$800', percentage: '16%' },
                    { label: 'COLA', value: '$400', percentage: '8%' },
                    { label: 'Utilities', value: '$300', percentage: '6%' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ 
                            backgroundColor: index === 0 ? '#3b82f6' : 
                                           index === 1 ? '#10b981' : 
                                           index === 2 ? '#6366f1' : '#f59e0b'
                          }}
                        />
                        <span className="text-xs">{item.label}</span>
                      </div>
                      <div className="text-xs font-medium">{item.value}</div>
                    </div>
                  ))}
                  
                  <div className="pt-3 mt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Total</span>
                      <div className="text-xs font-bold">$5,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        id="cta" 
        ref={sectionRefs.cta}
        className={cn(
          "py-20 md:py-32 px-6 bg-muted/30 transition-opacity duration-1000",
          isVisible.cta ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
            Ready to transform your payroll management?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of businesses using our platform to streamline their payroll processes and improve employee satisfaction.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
