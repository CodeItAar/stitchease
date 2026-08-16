package com.example.StitchEase.dto;

import java.util.List;

public class DashboardDTO {
    private Metrics metrics;
    private List<ChartData> ordersOverTime;
    private List<CategoryData> ordersByCategory;
    private List<RecentOrder> recentOrders;

    // Getters and Setters
    public Metrics getMetrics() { return metrics; }
    public void setMetrics(Metrics metrics) { this.metrics = metrics; }

    public List<ChartData> getOrdersOverTime() { return ordersOverTime; }
    public void setOrdersOverTime(List<ChartData> ordersOverTime) { this.ordersOverTime = ordersOverTime; }

    public List<CategoryData> getOrdersByCategory() { return ordersByCategory; }
    public void setOrdersByCategory(List<CategoryData> ordersByCategory) { this.ordersByCategory = ordersByCategory; }

    public List<RecentOrder> getRecentOrders() { return recentOrders; }
    public void setRecentOrders(List<RecentOrder> recentOrders) { this.recentOrders = recentOrders; }

    public static class Metrics {
        private int totalOrders;
        private double revenue;
        private int activeOrders;
        private int completionRate;

        // Getters and Setters
        public int getTotalOrders() { return totalOrders; }
        public void setTotalOrders(int totalOrders) { this.totalOrders = totalOrders; }
        
        public double getRevenue() { return revenue; }
        public void setRevenue(double revenue) { this.revenue = revenue; }
        
        public int getActiveOrders() { return activeOrders; }
        public void setActiveOrders(int activeOrders) { this.activeOrders = activeOrders; }
        
        public int getCompletionRate() { return completionRate; }
        public void setCompletionRate(int completionRate) { this.completionRate = completionRate; }
    }

    public static class ChartData {
        private String name;
        private int total;

        public ChartData(String name, int total) { this.name = name; this.total = total; }
        public String getName() { return name; }
        public int getTotal() { return total; }
    }

    public static class CategoryData {
        private String name;
        private int value;
        private String color;

        public CategoryData(String name, int value, String color) { this.name = name; this.value = value; this.color = color; }
        public String getName() { return name; }
        public int getValue() { return value; }
        public String getColor() { return color; }
    }

    public static class RecentOrder {
        private String id;
        private String customer;
        private String initials;
        private String design;
        private String stage;
        private double amount;
        private String date;

        public RecentOrder(String id, String customer, String initials, String design, String stage, double amount, String date) {
            this.id = id; this.customer = customer; this.initials = initials; this.design = design; this.stage = stage; this.amount = amount; this.date = date;
        }

        // Getters
        public String getId() { return id; }
        public String getCustomer() { return customer; }
        public String getInitials() { return initials; }
        public String getDesign() { return design; }
        public String getStage() { return stage; }
        public double getAmount() { return amount; }
        public String getDate() { return date; }
    }
}
