"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  User,
  Mail,
  Phone,
  FileText,
  Gamepad2,
} from "lucide-react";
import {
  createPixPayment,
  ProductType,
} from "@/lib/payment/abacatepay";
import { createUser } from "@/services/userService";
import { PlansName } from "@/models/enums/plansName";
import { ClientInfo } from "@/models/Payment";

export interface Product {
  product: ProductType;
  period: string;
  description: string;
  features: string[];
  color: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Product | null;
}

export function CheckoutModal({
  isOpen,
  onClose,
  selectedPlan,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    taxId: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCPF = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara XXX.XXX.XXX-XX
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2");
    }
    return numbers
      .slice(0, 11)
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPhone = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
    return numbers.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    handleInputChange("taxId", formatted);
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleInputChange("phone", formatted);
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 3 &&
      formData.email.includes("@") &&
      formData.phone.replace(/\D/g, "").length >= 10 &&
      formData.taxId.replace(/\D/g, "").length === 11
    );
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      taxId: "",
    });
    onClose();
  };

  if (!selectedPlan) return null;

  function formatCentavosToReal(valueInCentavos: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valueInCentavos / 100);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 bg-gradient-to-r ${selectedPlan.color} rounded-lg flex items-center justify-center`}
              >
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl text-white">
                  Finalizar Assinatura
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Plano {selectedPlan.product.name as PlansName} -{" "}
                  {formatCentavosToReal(selectedPlan.product.price)} /
                  {selectedPlan.period}
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumo do Plano */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">
                  Plano {selectedPlan.product.name as PlansName}
                </CardTitle>
                <Badge
                  className={`bg-gradient-to-r ${selectedPlan.color} text-white`}
                >
                  {selectedPlan.product.name as PlansName}
                </Badge>
              </div>
              <CardDescription className="text-gray-400">
                {selectedPlan.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-2xl font-bold text-white">
                  {formatCentavosToReal(selectedPlan.product.price)}
                </span>
                <span className="text-gray-400">{selectedPlan.period}</span>
              </div>
              <div className="space-y-2">
                {selectedPlan.features.slice(0, 3).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Formulário */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-white flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Nome Completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-white flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-white flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Telefone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
                maxLength={15}
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="taxId"
                className="text-white flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                CPF
              </Label>
              <Input
                id="taxId"
                type="text"
                placeholder="000.000.000-00"
                value={formData.taxId}
                onChange={(e) => handleCPFChange(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
                maxLength={14}
                required
              />
            </div>
          </form>

          {/* Informações de Segurança */}
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              <span className="text-cyan-400 text-sm font-medium">
                Pagamento Seguro
              </span>
            </div>
            <p className="text-gray-300 text-xs">
              Seus dados estão protegidos e o pagamento é processado de forma
              segura via PIX.
            </p>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 border-gray-600 text-white hover:bg-gray-800 bg-transparent"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={async () => {
                const billingRes = createPixPayment(
                  selectedPlan.product,
                  formData as ClientInfo
                );
                createUser({
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  taxId: formData.taxId,
                  plan: selectedPlan.product.name as PlansName,
                });
                if ((await billingRes).data.url) {
                  window.location.href = (await billingRes).data.url;
                }
              }}
              disabled={!isFormValid() || isLoading}
              className={`flex-1 bg-gradient-to-r ${selectedPlan.color} hover:opacity-90 transition-opacity`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processando...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pagar no PIX
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
