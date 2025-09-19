import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Gift, Crown } from "lucide-react";
import userAvatar from "@/assets/user-avatar.png";

const UserProfile = () => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-0 shadow-premium">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-primary-foreground/20">
            <AvatarImage src={userAvatar} alt="Rakib" />
            <AvatarFallback>IH</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold">Rakib</h2>
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                <Crown className="h-3 w-3 mr-1" />
                Gold Member
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                <span>2,450 Points</span>
              </div>
              <div className="flex items-center gap-1">
                <Gift className="h-4 w-4" />
                <span>12 Rewards</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-primary-foreground/10 rounded-lg p-3">
          <div className="flex justify-between items-center text-sm">
            <span>Progress to Platinum</span>
            <span>550 points to go</span>
          </div>
          <div className="mt-2 bg-primary-foreground/20 rounded-full h-2">
            <div className="bg-accent rounded-full h-2 w-4/5"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;