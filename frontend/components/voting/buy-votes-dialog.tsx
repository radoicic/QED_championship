"use client"

import { useState } from "react"
import { Loader2, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/language-provider"
import { useAuth } from "@/lib/auth-provider"

interface BuyVotesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccessfulPurchase?: () => void
}

export default function BuyVotesDialog({ open, onOpenChange, onSuccessfulPurchase }: BuyVotesDialogProps) {
  const { t } = useLanguage()
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState("basic")
  const [isLoading, setIsLoading] = useState(false)

  const votePlans = [
    {
      id: "basic",
      name: t("votes.basic.name"),
      votes: 5,
      price: "$5",
      icon: <Zap className="h-4 w-4 text-primary" />,
    },
    {
      id: "standard",
      name: t("votes.standard.name"),
      votes: 15,
      price: "$12",
      popular: true,
      icon: <Zap className="h-4 w-4 text-primary" />,
      bonus: "+5 bonus points",
    },
    {
      id: "premium",
      name: t("votes.premium.name"),
      votes: 30,
      price: "$20",
      icon: <Sparkles className="h-4 w-4 text-primary" />,
      bonus: "+15 bonus points",
    },
  ]

  const handlePurchase = async () => {
    setIsLoading(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const plan = votePlans.find((p) => p.id === selectedPlan)

      if (plan && user) {
        // Calculate bonus points
        let bonusPoints = 0
        if (plan.id === "standard") bonusPoints = 5
        if (plan.id === "premium") bonusPoints = 15

        // Update user votes and points
        await updateUser({
          ...user,
          votes: (user.votes || 0) + plan.votes,
          points: user.points + bonusPoints,
        })

        toast({
          title: t("votes.purchase_success"),
          description: plan.bonus
            ? `${plan.votes} votes and ${plan.bonus} have been added to your account!`
            : `${plan.votes} votes have been added to your account!`,
        })

        onOpenChange(false)

        // Call the callback if it exists
        if (onSuccessfulPurchase) {
          setTimeout(() => onSuccessfulPurchase(), 100)
        }
      }
    } catch (error) {
      toast({
        title: t("votes.purchase_error"),
        description: t("votes.try_again"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("votes.dialog_title")}</DialogTitle>
          <DialogDescription>{t("votes.dialog_description")}</DialogDescription>
        </DialogHeader>

        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4 my-4">
          {votePlans.map((plan) => (
            <div
              key={plan.id}
              className={`flex items-center space-x-2 rounded-lg border p-4 ${plan.popular ? "border-primary" : ""}`}
            >
              <RadioGroupItem value={plan.id} id={plan.id} />
              <Label htmlFor={plan.id} className="flex flex-1 justify-between cursor-pointer">
                <div>
                  <div className="flex items-center gap-1">
                    {plan.icon}
                    <span className="font-medium">{plan.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t("votes.get_votes", { count: plan.votes })}</p>
                  {plan.bonus && <p className="text-xs text-primary mt-1">{plan.bonus}</p>}
                </div>
                <span className="text-lg font-bold">{plan.price}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <DialogFooter>
          <Button onClick={handlePurchase} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("votes.purchase_button")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
