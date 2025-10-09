import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Star, Calendar, User } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ["/api/auth/me"],
  });

  const userId = (currentUser as any)?.user?.id;

  const { data: profile } = useQuery({
    queryKey: ["/api/profiles/user", userId],
    enabled: !!userId,
  });

  const { data: matchesData } = useQuery({
    queryKey: ["/api/matches/user", userId],
    enabled: !!userId,
  });

  const { data: favoritesData } = useQuery({
    queryKey: ["/api/favorites/user", userId],
    enabled: !!userId,
  });

  const { data: registrationsData } = useQuery({
    queryKey: ["/api/event-registrations/user", userId],
    enabled: !!userId,
  });

  if (isLoadingUser) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
        <Link href="/login">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  const matches = (matchesData as any)?.matches || [];
  const favorites = (favoritesData as any)?.favorites || [];
  const registrations = (registrationsData as any)?.registrations || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Welcome back, {(profile as any)?.profile?.name || "there"}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold" data-testid="text-matches-count">{matches.length}</div>
              <div className="text-sm text-muted-foreground">Matches</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-chart-2/10 p-3 rounded-full">
              <MessageCircle className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <div className="text-2xl font-bold" data-testid="text-messages-count">0</div>
              <div className="text-sm text-muted-foreground">Messages</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-chart-3/10 p-3 rounded-full">
              <Star className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <div className="text-2xl font-bold" data-testid="text-favorites-count">{favorites.length}</div>
              <div className="text-sm text-muted-foreground">Favorites</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-chart-4/10 p-3 rounded-full">
              <Calendar className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <div className="text-2xl font-bold" data-testid="text-events-count">{registrations.length}</div>
              <div className="text-sm text-muted-foreground">Events</div>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="matches" className="space-y-6">
        <TabsList>
          <TabsTrigger value="matches" data-testid="tab-matches">Matches</TabsTrigger>
          <TabsTrigger value="favorites" data-testid="tab-favorites">Favorites</TabsTrigger>
          <TabsTrigger value="events" data-testid="tab-events">My Events</TabsTrigger>
          <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-4">
          {matches.length === 0 ? (
            <Card className="p-12 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No matches yet</h3>
              <p className="text-muted-foreground mb-4">
                Start liking profiles to find your perfect match
              </p>
              <Link href="/browse">
                <Button>Browse Profiles</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid gap-4">
              {matches.map((match: any) => (
                <Card key={match.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">New Match!</div>
                        <div className="text-sm text-muted-foreground">
                          Matched on {new Date(match.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">Send Message</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          {favorites.length === 0 ? (
            <Card className="p-12 text-center">
              <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
              <p className="text-muted-foreground mb-4">
                Save profiles you're interested in
              </p>
              <Link href="/browse">
                <Button>Browse Profiles</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid gap-4">
              <p className="text-muted-foreground">You have {favorites.length} saved profiles</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {registrations.length === 0 ? (
            <Card className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No events registered</h3>
              <p className="text-muted-foreground mb-4">
                Join exciting dating events and meetups
              </p>
              <Link href="/events">
                <Button>Browse Events</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid gap-4">
              <p className="text-muted-foreground">You're registered for {registrations.length} events</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          {(profile as any)?.profile ? (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Your Profile</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground">Name: </span>
                  <span className="font-medium">{(profile as any).profile.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Age: </span>
                  <span className="font-medium">{(profile as any).profile.age}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Location: </span>
                  <span className="font-medium">{(profile as any).profile.location}</span>
                </div>
                {(profile as any).profile.profession && (
                  <div>
                    <span className="text-muted-foreground">Profession: </span>
                    <span className="font-medium">{(profile as any).profile.profession}</span>
                  </div>
                )}
                <Button variant="outline" className="mt-4">Edit Profile</Button>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No profile created</h3>
              <p className="text-muted-foreground mb-4">
                Create your profile to start matching
              </p>
              <Link href="/create-profile">
                <Button>Create Profile</Button>
              </Link>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
