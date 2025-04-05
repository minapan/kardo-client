import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Avatar
} from '@mui/material'
import { TaskAlt, Group, CalendarToday } from '@mui/icons-material'
import AppBar from '~/components/AppBar/AppBar'
import { AutoAwesome } from '@mui/icons-material'
import { useState } from 'react'
import { useEffect } from 'react'
import { testimonials } from '~/utils/constants'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Fixed AppBar */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1200 }}>
        <AppBar />
      </Box>

      <Box sx={{ bgcolor: 'background.default', pt: { xs: 8, md: 12 } }}>
        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12, lg: 18 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 40, md: 60 },
                  color: 'text.primary',
                  lineHeight: 1.2,
                  mb: 3,
                  opacity: 0,
                  animation: 'fadeIn 1s ease-out forwards'
                }}
              >
                Master Your Workflow with Trello
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                From brainstorming to delivery, manage tasks and teams with ease.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Link to="/register">
                  <Button variant="contained" color="primary" size="large" sx={{ px: 4, py: 1.5 }}>
                    Get Started Free
                  </Button>
                </Link>
                <a href="#demo">
                  <Button variant="outlined" color="primary" size="large" sx={{ px: 4, py: 1.5 }}>
                    Watch Demo
                  </Button>
                </a>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image="https://base.vn/wp-content/uploads/2024/06/trello-la-gi.webp"
                alt="Trello in Action"
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 10px 30px rgba(0, 121, 191, 0.3)',
                  maxWidth: '100%',
                  opacity: 0,
                  animation: 'slideUp 0.8s ease-out forwards'
                }}
              />
            </Grid>
          </Grid>
        </Container>

        {/* Video Demo Section */}
        <div id='demo'></div>
        <Box sx={{ py: 12 }} >
          <Container maxWidth="lg">
            <Typography variant="h4" align="center" sx={{ color: 'text.primary', mb: 6 }}>
              See Trello in Action
            </Typography>
            <Card
              sx={{
                maxWidth: 800,
                mx: 'auto',
                boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                opacity: 0,
                animation: 'scaleIn 0.6s ease-out forwards'
              }}
            >
              <CardMedia
                component="video"
                controls
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                poster="https://base.vn/wp-content/uploads/2024/06/trello-la-gi.webp"
                sx={{ borderRadius: '8px 8px 0 0' }}
              />
            </Card>
          </Container>
        </Box>
        {/* Features Section */}
        <Box sx={{ bgcolor: 'background.paper', py: 12 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" align="center" sx={{ color: 'text.primary', mb: 2 }}>
              Everything You Need to Succeed
            </Typography>
            <Divider sx={{ width: 80, mx: 'auto', mb: 8, borderColor: 'primary.main', borderWidth: 3 }} />
            <Grid container spacing={4}>
              {[
                { icon: <TaskAlt />, title: 'Task Management', desc: 'Organize projects with boards, lists, and cards.' },
                { icon: <Group />, title: 'Team Collaboration', desc: 'Real-time teamwork, anywhere, anytime.' },
                { icon: <CalendarToday />, title: 'Smart Scheduling', desc: 'Set deadlines and never miss a beat.' },
                { icon: <AutoAwesome />, title: 'Automation', desc: 'Save time with built-in Butler automation.' }
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      p: 3,
                      height: '100%',
                      textAlign: 'center',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': { transform: 'scale(1.05)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' },
                      opacity: 0,
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`
                    }}
                  >
                    <CardContent>
                      <Box sx={{ mb: 2, color: 'primary.main' }}>{feature.icon}</Box>
                      <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">{feature.desc}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>


        {/* Testimonials Section with Carousel */}
        <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Typography variant="h4" align="center" sx={{ color: 'text.primary', mb: 8 }}>
              Loved by Teams Worldwide
            </Typography>
            <Box sx={{ position: 'relative', maxWidth: 800, mx: 'auto', overflow: 'hidden' }}>
              <Box
                sx={{
                  display: 'flex',
                  transition: 'transform 0.5s ease',
                  transform: `translateX(-${currentTestimonial * 100}%)`
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    sx={{
                      p: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      minWidth: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <Avatar src={testimonial.avatar} sx={{ bgcolor: 'primary.main', width: 64, height: 64 }} />
                    <Box>
                      <Typography variant="h6" sx={{ color: 'text.primary' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {testimonial.role}
                      </Typography>
                      <Typography sx={{ color: 'text.primary' }}>&quot;{testimonial.text}&quot;</Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
                {testimonials.map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    sx={{
                      minWidth: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: currentTestimonial === index ? 'primary.main' : 'grey.400',
                      p: 0,
                      transition: 'background-color 0.3s',
                      '&:hover': { bgcolor: 'primary.light' }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ py: 12 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" align="center" sx={{ color: 'text.primary', mb: 8 }}>
              Simple, Flexible Pricing
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                { plan: 'Free', price: '$0', desc: 'Basic features for small teams.', cta: 'Get Started' },
                { plan: 'Premium', price: '$10/mo', desc: 'Advanced tools for growing teams.', cta: 'Try Now' }
              ].map((pricing, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      transition: 'all 0.3s',
                      '&:hover': { boxShadow: '0 12px 24px rgba(0,0,0,0.15)' },
                      opacity: 0,
                      animation: `fadeInUp 0.5s ease-out ${index * 0.2}s forwards`
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 2, color: 'text.primary' }}>{pricing.plan}</Typography>
                    <Typography variant="h3" color="primary" sx={{ mb: 2 }}>{pricing.price}</Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>{pricing.desc}</Typography>
                    <Button variant="contained" color="primary" sx={{ px: 4 }}>{pricing.cta}</Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Final CTA */}
        <Box sx={{ py: 8, bgcolor: 'primary.main', textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography variant="h3" sx={{ color: '#fff', mb: 3 }}>
              Ready to Transform Your Work?
            </Typography>
            <Button
              component={Link}
              to="/register"
              sx={{
                backgroundColor: '#fff',
                color: 'primary.main',
                border: '1px solid #fff',
                px: 5, py: 2,
                '&:hover': {
                  border: '1px solid #fff',
                  color: '#fff'
                }
              }} >
              Join Trello Today
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : '#485460', py: 4, textAlign: 'center', color: '#fff' }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()}<br />
            Build by&nbsp;
            <Link to="https://facebook.com/minapan204" target="_blank" rel="noopener noreferrer" style={{
              color: 'white', textDecoration: 'none'
            }}>
              MinhNhatPhan
            </Link>
          </Typography>
        </Box>
      </Box >
    </>
  )
}

export default LandingPage